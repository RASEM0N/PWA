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

// https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
// https://stackoverflow.com/questions/30177782/chrome-serviceworker-postmessage
// https://googlechrome.github.io/samples/service-worker/post-message/
export const sendMessage = ({ type, extra }: { type: string; extra: Object }): Promise<any> => {
	const controller = navigator.serviceWorker.controller;
	if (!controller) {
		return Promise.reject();
	}

	// 1 отправляем действие
	// 2 ждем ответ
	return new Promise((resolve, reject) => {
		// 1-ый порт это нашь
		// 2-ой для service worker-а будет
		const channel = new MessageChannel();

		let timeout: number | null = window.setTimeout(() => {
			reject('Вышло время');
			timeout = null;
		}, 10000);

		channel.port1.onmessage = (event) => {
			if (!timeout) {
				return;
			}

			if (event.data.error) {
				reject(event.data.error);
			} else {
				resolve(event.data);
			}

			clearTimeout(timeout);
			timeout = null;
		};

		controller.postMessage(
			{ type, extra },
			{
				transfer: [channel.port2],
			},
		);
	});
};
