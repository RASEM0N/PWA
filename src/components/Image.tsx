interface Props {
	src: string;
	alt: string;
}

export const Image = ({ src, alt }: Props) => (
	<img
		style={{
			display: 'block',
			width: '200px',
			height: '150px',
			objectFit: 'cover',
		}}
		alt={alt}
		src={src}
	/>
);
