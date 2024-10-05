export const register = (): Promise<void> => {
	return navigator.serviceWorker
		.register(`${__SW_PATH__}?development=${__IS_DEV__}`)
		.then(() => {
			console.info(`[SERVICE WORKER] Success registered`);
		})
		.catch((e) => {
			console.error(`[SERVICE WORKER]`, e);
		});
};
