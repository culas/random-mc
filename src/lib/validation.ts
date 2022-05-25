export function alphaNumericStringWithWhitespace(str: string): string {
	return (typeof str === 'string') ? str.toLowerCase().replace(/[^a-z 0-9]/g, '') : '';
}

export function idString(str: string): string {
	return (typeof str === 'string') ? str.toLowerCase().replace(/[^a-z0-9-]/g, '') : '';
}