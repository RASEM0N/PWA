import { PluginOption } from 'vite';

export const injectVarsInHTML = (vars: { [key: string]: any }): PluginOption => {
	return {
		name: 'inject-vars-in-html',
		transformIndexHtml: (html) => {
			return Object.entries(vars).reduce((r, [variable, value]) => {
				return r.replaceAll(`<%= ${variable} %>`, String(value));
			}, html);
		},
	};
};