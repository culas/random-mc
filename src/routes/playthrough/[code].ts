import clientPromise from '$lib/db';
import type { Playthrough } from '$lib/models/playthrough.model';
import type { RequestEvent } from '@sveltejs/kit';
import type { MongoClient } from 'mongodb';

export async function get({ params: { code } }: RequestEvent) {
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

export async function post({ params: { code }, request }: RequestEvent) {
	const dbConnection: MongoClient = await clientPromise;
	const db = dbConnection.db();
	const collection = db.collection('playthroughs');
	const playthrough = (await collection.findOne({ code })) as Playthrough | null;
	const formData = await request.formData();
	const block = formData.get('block');
	const drop = formData.get('drop');

	if (!playthrough || !block || typeof block !== 'string' || !drop || typeof drop !== 'string') {
		return {
			status: 404,
			body: { error: 'Playthrough not found' }
		}
	}

	const chain = playthrough.chains.find(chain => chain.includes(block) || chain.includes(drop))

	if (chain) {
		if (chain[0] === drop) {
			chain.unshift(block);
		} else if (chain[chain.length - 1] === block) {
			chain.push(drop);
		}
	} else {
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
