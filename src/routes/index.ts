import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

export async function post({ request }: RequestEvent) {
	const playthrough = (await request.formData()).get('playthrough');
	if (validCode(playthrough)) {
		return {
			status: 303,
			headers: {
				location: `/playthrough/${playthrough}`
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