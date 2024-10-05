import { useCallback, useEffect, useState } from 'react';

let installPrompt: Event | undefined;
let onBeforeInstallPrompt: Function | undefined;

window.addEventListener('appinstalled', () => {
	console.log('Thank you for installing our app!');
});

window.addEventListener('beforeinstallprompt', (event) => {
	installPrompt = event;
	onBeforeInstallPrompt?.();

	// @ts-ignore
	window.pwaPrompt = event;
});

export const InstallPWA = () => {
	const [isShow, setIsShow] = useState<boolean>(() => !!installPrompt);

	useEffect(() => {
		if (isShow) {
			return;
		}

		onBeforeInstallPrompt = () => setIsShow(true);
		return () => (onBeforeInstallPrompt = undefined);
	}, []);

	const install = useCallback(async () => {
		if (!installPrompt) {
			return;
		}

		// @ts-ignore
		await installPrompt.prompt();
		installPrompt = undefined;
		setIsShow(false);
	}, []);

	if (!isShow) {
		return null;
	}

	return (
		<button
			onClick={install}
			style={{
				position: 'fixed',
				top: '20px',
				right: '20px',
				backgroundColor: '#eb9f9f',
			}}
		>
			Install
		</button>
	);
};
