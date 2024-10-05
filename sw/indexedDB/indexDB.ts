let db: IDBDatabase;

/**
 * У дефолтного API есть большая проблема
 * - это блять оно сделано на callback-ах
 * - это просто пиздец
 */

/**
 * Структура IndexDB
 * IndexDB
 *        [db]
 *            [store]
 *                key:value
 *                key:value
 *          [store]
 *              key:value
 *
 *      [db]
 *          [store]
 *              key:value
 */

/**
 * 1. создаем БД - indexedDB.open (если нет, то создатся)
 * 2. ждем пока создатся
 * 3. если БД новое или версии БД не было ещё, то будет dbRequest.onupgradeneeded,
 * где надо произвести какие-то действия, что потом использовать
 * - для создание сторов используются
 * - для миграции данных
 * (тип раньше в Todo было поле title, а потом стало description)
 */

export const open = () => {
	const dbRequest = indexedDB.open('mydb', 1);

	dbRequest.onsuccess = () => {
		db = dbRequest.result;
	};

	dbRequest.onupgradeneeded = () => {
		db = dbRequest.result;

		if (!db.objectStoreNames.contains('todos')) {
			db.createObjectStore('todos', { keyPath: 'id' });
		}
	};

	dbRequest.onerror = (...args) => {
		console.error('ERROR', ...args);
	};

	dbRequest.onblocked = (...args) => {
		console.error('BLOCKED', ...args);
	};
};

export const addTodos = (todos: Object[]) => {
	const transaction = db.transaction('todos', 'readwrite');
	const store = transaction.objectStore('todos');

	for (const todo of todos) {
		store.put(todo);
	}
};

export const getTodos = (): Promise<Object[]> => {
	const transaction = db.transaction('todos', 'readwrite');
	return new Promise((resolve) => {
		const request = transaction.objectStore('todos').getAll();
		request.onsuccess = () => {
			resolve(request.result);
		};
	});
};
