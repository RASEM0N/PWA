import './styles/styles.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { register } from './service-worker';
import { Wrapper } from './components/Wrapper';
import { Image } from './components/Image';
import { Flex } from './components/Flex';
import { Todos } from './components/todos/Todos';
import { InstallPWA } from './pwa';
import { Counter } from './components/Counter';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<InstallPWA />
		<Wrapper>
			<Flex>
				<Image src="images/blood-moon.jpg" alt="blood-moon" />
				<Image src="images/woman.jpg" alt="woman" />
			</Flex>
			<Counter />
			<div style={{ marginTop: '20px' }}>
				<Todos />
			</div>
		</Wrapper>
	</StrictMode>,
);

register();
