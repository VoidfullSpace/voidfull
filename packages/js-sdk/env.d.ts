interface ImportMetaEnv {
	[key: string]: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
