const CACHE_SEPARATOR = '__v';

const getCacheName = ({ name, version }: DefineCache): string => {
	return `${name}${CACHE_SEPARATOR}${version}`;
};

export const getCache = (define: DefineCache) => self.caches.open(getCacheName(define));

export const deleteOldVersions = async ({ version, name }: DefineCache) => {
	for (const key of await self.caches.keys()) {
		const [cacheName, cacheVersion] = key.split(CACHE_SEPARATOR);

		if (cacheName !== name) {
			continue;
		}

		if (+cacheVersion === version) {
			continue;
		}

		await self.caches.delete(key);
	}
};

export const addAll = async (define: DefineCache) => {
	const cache = await self.caches.open(getCacheName(define));
	return cache.addAll(define.hrefs);
};

export const getCacheValue = async (
	define: DefineCache,
	request: Request,
): Promise<Response | undefined> => {
	const cache = await getCache(define);
	return cache.match(request.url);
};
