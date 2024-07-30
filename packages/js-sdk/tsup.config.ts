import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
	entry: ['./src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	minify: true,
	...options
}));
