import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div
			style={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '15px',
			}}
		>
			<img
				style={{
					display: 'block',
					width: '200px',
					height: '150px',
					objectFit: 'cover',
				}}
				alt="blood-moon"
				src="images/blood-moon.jpg"
			/>
			<img
				style={{
					display: 'block',
					width: '200px',
					height: '150px',
					objectFit: 'cover',
				}}
				alt="woman"
				src="images/woman.jpg"
			/>
		</div>
	</StrictMode>,
);

navigator.serviceWorker
	.register(__SW_PATH__)
	.then(() => {
		console.info(`[SERVICE WORKER] Success registered`);
	})
	.catch((e) => {
		console.error(`[SERVICE WORKER]`, e);
	});
