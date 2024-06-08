export async function getPackageVersion(): Promise<string> {
	const packageJson = await import('../package.json');
	return packageJson.version;
}
