export const IS_DEV = new URL(self.location.href).searchParams.get('development') === 'true';
