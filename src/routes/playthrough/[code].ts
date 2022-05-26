import clientPromise from '$lib/db';
import type { Playthrough } from '$lib/models/playthrough.model';
import { alphaNumericStringWithWhitespace, idString } from '$lib/validation';
import type { RequestEvent } from '@sveltejs/kit';
import type { MongoClient } from 'mongodb';

export async function get({ params }: RequestEvent) {
	const code = idString(params.code);
	const collection = await getCollection();
	const { value: playthrough } = await collection.findOneAndUpdate(
		{ code },
		{ $setOnInsert: { code, chains: [] } },
		{
			returnDocument: 'after',
			upsert: true,
		}
	);

	return {
		status: 200,
		body: playthrough
	}
}

export async function post({ params, request }: RequestEvent) {
	const code = idString(params.code);
	const formData = await request.formData();
	const block = alphaNumericStringWithWhitespace(formData.get('block'));
	const drop = alphaNumericStringWithWhitespace(formData.get('drop'));

	const collection = await getCollection();
	const playthrough = (await collection.findOne({ code }));

	if (!playthrough || !block || !drop) {
		return {
			status: 404,
			body: { error: 'Invalid data' }
		}
	}

	let merged = false;
	let newChains: string[][] = [];
	let modified: string[] | undefined;
	playthrough.chains.forEach(chain => {
		if (merged) {
			newChains.push(chain);
		} else {
			if (modified) {
				if (toPrepend(chain, drop)) {
					modified.push(...chain.slice(1));
					merged = true;
				} else if (toAppend(chain, block)) {
					modified.unshift(...chain.slice(0, -1))
					merged = true;
				} else {
					newChains.push(chain);
				}
			} else {
				if (toPrepend(chain, drop)) {
					modified = [block, ...chain];
				} else if (toAppend(chain, block)) {
					modified = [...chain, drop];
				} else {
					newChains.push(chain);
				}
			}
		}
	});
	if (modified) {
		newChains.unshift(modified);
	}

	const containsElementsSomewhere = newChains.some(chain => chain.includes(block) || chain.includes(drop))
	if (!containsElementsSomewhere) {
		newChains.unshift([block, drop]);
	}

	const { value: updatedPlaythrough } = await collection.findOneAndUpdate(
		{ code },
		{ $set: { chains: newChains } },
		{
			returnDocument: 'after'
		}
	);

	return {
		status: 200,
		body: updatedPlaythrough
	}
}

export async function del({ params, request }: RequestEvent) {
	const code = idString(params.code);
	const formData = await request.formData();
	const itemToDelete = alphaNumericStringWithWhitespace(formData.get('item'));

	const collection = await getCollection();
	const playthrough = (await collection.findOne({ code }));

	if (!playthrough || !itemToDelete) {
		return {
			status: 404,
			body: { error: 'Invalid data' }
		}
	}

	playthrough.chains = playthrough.chains
		.map(chain => chain.filter(item => item !== itemToDelete))
		.filter(chain => chain.length > 0);

	const { value: updatedPlaythrough } = await collection.findOneAndUpdate(
		{ code },
		{ $set: { chains: playthrough.chains } },
		{
			returnDocument: 'after'
		}
	);

	return {
		status: 303,
		headers: {
			location: `/playthrough/${code}`
		},
		body: updatedPlaythrough
	}
}

async function getCollection() {
	const dbConnection: MongoClient = await clientPromise;
	const db = dbConnection.db();
	return db.collection<Playthrough>('playthroughs');
}

function toPrepend(chain: string[], drop: string): boolean {
	return chain[0] === drop;
}

function toAppend(chain: string[], block: string): boolean {
	return chain[chain.length - 1] === block;
}