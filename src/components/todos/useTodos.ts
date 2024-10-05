import { useCallback, useState } from 'react';
import { Todo } from './types';
import { sendMessage as sendMessageToSW } from '../../service-worker';

export enum STATUS {
	none = 'none',
	loading = 'loading',
	error = 'error',
	loaded = 'loaded',
}

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [status, setStatus] = useState<STATUS>(STATUS.none);

	const loadFromCache = useCallback(() => {
		setStatus(STATUS.loading);
		fetch('https://jsonplaceholder.typicode.com/todos/', {
			headers: {
				'Cache-Service-Worker-Name': 'fetch-cache',
				'Cache-Service-Worker-Version': '1',
			},
		})
			.then((r) => r.json())
			.then((r) => {
				setTodos(r.slice(0, 10));
				setStatus(STATUS.loaded);
			})
			.catch(() => {
				setStatus(STATUS.error);
			});
	}, []);

	const loadViaPostMessage = useCallback((needCache = false) => {
		setStatus(STATUS.loading);
		sendMessageToSW({
			type: 'fetch',
			extra: { url: 'https://jsonplaceholder.typicode.com/todos/', needCache  },
		})
			.then((r) => {
				setTodos(r.slice(0, 10));
				setStatus(STATUS.loaded);
			})
			.catch(() => {
				setStatus(STATUS.error);
			});
	}, []);

	const loadViaPostMessageFromIndexDB = useCallback(() => loadViaPostMessage(true), []);

	return {
		loadFromCache,
		loadViaPostMessage,
		loadViaPostMessageFromIndexDB,
		todos,
		status,
	};
};
