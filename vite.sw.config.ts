import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/

// ошибка в output, когда используем вместе
// dir и format, хотя компилится все ок
// @ts-ignore
export default defineConfig(() => {
	const payload = {
		name: 'payload',
		version: 1,
		hrefs: [
			'robots.txt',
			'manifest.json',
			'images/blood-moon.jpg',
			'images/woman.jpg',
			'assets/index.js',
			'assets/index.css',
		],
	};

	const content = {
		name: 'content',
		version: 1,
		hrefs: [],
	};

	return {
		define: {
			__CACHE_PAYLOAD__: JSON.stringify(payload),
			__CACHE_CONTENT__: JSON.stringify(content),
		},

		build: {
			minify: false,
			emptyOutDir: false,
			outDir: path.join(__dirname, 'public'),
			lib: {
				entry: path.join(__dirname, 'sw/index.ts'),
				fileName: 'service-worker',
				formats: ['es'],
			},
		},
	};
});
