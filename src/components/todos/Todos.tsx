import { STATUS, useTodos } from './useTodos';

export const Todos = () => {
	const { todos, status, loadFromCache, loadViaPostMessage, loadViaPostMessageFromIndexDB } =
		useTodos();

	if (status === STATUS.none) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
				<button
					style={{
						flex: '1',
						padding: '10px',
						borderRadius: '8px',
						cursor: 'pointer',
						backgroundColor: '#ed9c9c',
					}}
					onClick={loadFromCache}
				>
					ЗАГРУЖАЕМ ИЗ КЭША СООБЩЕНИЯ
				</button>
				<button
					style={{
						flex: '1',
						padding: '10px',
						borderRadius: '8px',
						cursor: 'pointer',
						backgroundColor: '#9cbde7',
					}}
					onClick={loadViaPostMessageFromIndexDB}
				>
					ЗАГРУЖАЕМ ИЗ INDEX DB
				</button>
				<button
					style={{
						flex: '1',
						padding: '10px',
						borderRadius: '8px',
						cursor: 'pointer',
						backgroundColor: '#c5ea9b',
					}}
					onClick={() => loadViaPostMessage()}
				>
					ЗАГРУЖАЕМ ЧЕРЕЗ POST_MESSAGE
				</button>
			</div>
		);
	}

	if (status === STATUS.loading) {
		return <h1>Loading...</h1>;
	}

	if (status === STATUS.error) {
		return <h1>Error...</h1>;
	}

	return (
		<ul>
			{todos.map(({ id, title, completed }) => (
				<li key={id}>
					{completed ? '✅ ' : ''}
					{title}
				</li>
			))}
		</ul>
	);
};
