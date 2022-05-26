export function alphaNumericStringWithWhitespace(str: any): string {
	return (typeof str === 'string') ? str.toLowerCase().replace(/[^a-z 0-9]/g, '') : '';
}

export function idString(str: any): string {
	return (typeof str === 'string') ? str.toLowerCase().replace(/[^a-z0-9-]/g, '') : '';
}