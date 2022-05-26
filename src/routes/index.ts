import { idString } from '$lib/validation';
import type { RequestEvent } from '@sveltejs/kit';

export async function post({ request }: RequestEvent) {
	const playthrough = (await request.formData()).get('playthrough');
	const code = idString(playthrough);
	if (code !== '') {
		return {
			status: 303,
			headers: {
				location: `/playthrough/${code}`
			}
		};
	} else {
		return {
			status: 400,
			body: { error: 'No playthrough code provided' }
		}
	}
}
