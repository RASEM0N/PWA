import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const Wrapper = ({ children }: Props) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '50px',
				boxSizing: 'border-box',
				width: '100vw',
				height: '100vh',
			}}
		>
			{children}
		</div>
	);
};
