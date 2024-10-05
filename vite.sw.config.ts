import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/

// ошибка в output, когда используем вместе
// dir и format, хотя компилится все ок
// @ts-ignore
export default defineConfig(() => {
	const payload = {
		name: 'content',
		version: 1,

		// в ссылках обязательно / надо писать, без нее не заработает
		hrefs: [
			'/',
			'/assets/index.js',
			'/assets/index.css',

			'/robots.txt',
			'/manifest.json',
			'/images/blood-moon.jpg',
			'/images/woman.jpg',
		],
	};

	const content = {
		name: 'content_out',
		version: 1,
		hrefs: [
			'fonts.googleapis.com'
		],
	};

	return {
		define: {
			__CACHE_FOR_CONTENT__: JSON.stringify(payload),
			__CACHE_FOR_OUT_CONTENT__: JSON.stringify(content),
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
