import { idString } from '$lib/validation';
import type { RequestEvent } from '@sveltejs/kit';

export async function post({ request }: RequestEvent) {
	const playthrough = (await request.formData()).get('playthrough');
	const code = idString(playthrough);
	if (validCode(code)) {
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

function validCode(code: any): boolean {
	return (typeof code === 'string')
		&& !code.includes(' ')
		&& !code.includes('/');
}