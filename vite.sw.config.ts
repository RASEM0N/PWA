import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
	const payload = {
		name: 'payload',
		version: 1,
		hrefs: ['index.js', 'index.css', 'index.html'],
	};

	const content = {
		name: 'content',
		version: 1,
		hrefs: ['scripts/sw.js'],
	};

	return {
		define: {
			__CACHE_PAYLOAD__: JSON.stringify(payload),
			__CACHE_CONTENT__: JSON.stringify(content),
		},
		build: {
			rollupOptions: {
				input: path.join(__dirname, 'sw/index.ts'),
				output: {
					dir: './public/scripts',
					entryFileNames: 'sw.js',
				},
			},
		},
	};
});
