import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const Flex = ({ children }: Props) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
            }}
        >
            {children}
        </div>
    );
};
