import { STATUS, useTodos } from './useTodos';

export const Todos = () => {
	const { todos, status, loadFromCache } = useTodos();

	if (status === STATUS.none) {
		return (
			<div style={{ display: 'flex', gap: '30px' }}>
				<button style={{ flex: '1' }} onClick={loadFromCache}>
					Load todos
				</button>
				<button style={{ flex: '1' }} onClick={loadFromCache}>
					Load from Index DB
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
