import clientPromise from '$lib/db';
import type { Playthrough } from '$lib/models/playthrough.model';
import { alphaNumericStringWithWhitespace, idString } from '$lib/validation';
import type { RequestEvent } from '@sveltejs/kit';
import type { MongoClient } from 'mongodb';

export async function get({ params }: RequestEvent) {
	const code = idString(params.code);
	const dbConnection: MongoClient = await (clientPromise as Promise<MongoClient>);
	const db = dbConnection.db();
	const collection = db.collection('playthroughs');
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
	const dbConnection: MongoClient = await clientPromise;
	const db = dbConnection.db();
	const collection = db.collection('playthroughs');
	const playthrough = (await collection.findOne({ code })) as Playthrough | null;
	const formData = await request.formData();
	const block = alphaNumericStringWithWhitespace(formData.get('block') as string);
	const drop = alphaNumericStringWithWhitespace(formData.get('drop') as string);

	if (!playthrough || !block || !drop) {
		return {
			status: 404,
			body: { error: 'Invalid data' }
		}
	}

	playthrough.chains = playthrough.chains.map(chain => {
		if (chain[0] === drop) return [block, ...chain];
		if (chain[chain.length - 1] === block) return [...chain, drop];
		return chain;
	});

	const containsElementsSomewhere = playthrough.chains.some(chain => chain.includes(block) || chain.includes(drop))
	if (!containsElementsSomewhere) {
		playthrough.chains.push([block, drop]);
	}

	const { value: updatedPlaythrough } = await collection.findOneAndUpdate(
		{ code },
		{ $set: { chains: playthrough.chains } },
		{
			returnDocument: 'after'
		}
	);

	return {
		status: 200,
		body: updatedPlaythrough
	}
}
