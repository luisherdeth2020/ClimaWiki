import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BCZb_O9y.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/air-quality.astro.mjs');
const _page2 = () => import('./pages/forecast.astro.mjs');
const _page3 = () => import('./pages/map.astro.mjs');
const _page4 = () => import('./pages/saved.astro.mjs');
const _page5 = () => import('./pages/settings.astro.mjs');
const _page6 = () => import('./pages/weather.astro.mjs');
const _page7 = () => import('./pages/welcome.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/air-quality.astro", _page1],
    ["src/pages/forecast.astro", _page2],
    ["src/pages/map.astro", _page3],
    ["src/pages/saved.astro", _page4],
    ["src/pages/settings.astro", _page5],
    ["src/pages/weather.astro", _page6],
    ["src/pages/welcome.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: undefined
});
const _args = {
    "middlewareSecret": "6148e332-47cb-4406-8248-1f3373798d4d"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
