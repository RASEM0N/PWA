import { useState } from 'react';

export const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				marginTop: '10px',
				padding: '10px',
				gap: '10px',
				borderRadius: '8px',
				border: '1px solid black',
				justifyContent: 'space-between',
			}}
		>
			<h2>{count}</h2>
			<button
				onClick={() => {
					const newCount = count + 1;
					setCount(newCount);

					// Только у PWA работает
					navigator.setAppBadge(newCount);
				}}
			>
				Увеличиваем
			</button>

			<button
				onClick={() => {
					const newCount = count - 1;
					setCount(newCount);

					// Только у PWA работает
					navigator.setAppBadge(newCount);
				}}
			>
				Уменьшаем
			</button>
		</div>
	);
};
