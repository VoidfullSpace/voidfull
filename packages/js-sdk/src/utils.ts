export async function getPackageVersion(): Promise<string> {
	const packageJson = await import('../package.json');
	return packageJson.version;
}

export function getEnv(key: string): string | undefined {
	if (import.meta !== undefined && import.meta.env) {
		return import.meta.env[key];
	} else if (
		typeof process !== 'undefined' &&
		typeof process.env !== 'undefined'
	) {
		return process.env[key];
	}

	throw new Error(`Environment variable ${key} is not accessible`);
}
