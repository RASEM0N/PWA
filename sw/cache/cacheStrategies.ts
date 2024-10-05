import { getCache, getCacheValue } from './cache';

/**
 * Только из кэша достаем информацию
 * @param define
 * @param request
 */
export const onlyCache = (define: DefineCache, request: Request): Promise<Response> | null => {
	const url = new URL(request.url);

	if (!define.hrefs.includes(url.pathname)) {
		return null;
	}

	// Здесь 100% должно быть закэшировано заранее уже
	return getCacheValue(define, request) as Promise<Response>;
};

/**
 * Вначале из кэша достаем, если нету то делаем запрос и записываем в кэщ
 * @param define
 * @param request
 */
export const cacheFirst = async (define: DefineCache, request: Request): Promise<Response> => {
	const cache = await getCache(define);

	return getCacheValue(define, request).then((response) => {
		return (
			response ??
			fetch(request).then((response) => {
				cache.put(request, response.clone());
				return response;
			})
		);
	});
};

/**
 * Делаем запрос в интернет, если ошибка интернета то достаем из кэша
 * @param define
 * @param request
 */
export const firstNetwork = async (define: DefineCache, request: Request): Promise<Response> => {
	const cache = await getCache(define);

	return fetch(request)
		.then((response) => {
			cache.put(request, response.clone());
			return response;
		})
		.catch(async (error) => {
			const value = await cache.match(request.url);

			// В кэше может быть пустышка
			// если пустышка то опустим ниже её
			if (!value) {
				throw error;
			}

			return value;
		});
};

/**
 * Достаем из кэша и обновляем данные через запрос одновременно,
 * если в кэше нету то данные из запроса вернутся
 * @param define
 * @param request
 */
export const cacheFirstWithUpdate = async (
	define: DefineCache,
	request: Request,
): Promise<Response> => {
	const cache = await getCache(define);
	const value = await cache.match(request.url);

	const fetchResponse = fetch(request).then((response) => {
		cache.put(request, response.clone());
		return response;
	});

	return value ?? fetchResponse;
};
