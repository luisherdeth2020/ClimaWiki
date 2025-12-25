import { c as createComponent, d as createAstro } from '../chunks/astro/server_CoLVhjdj.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Map = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Map;
  return Astro2.redirect("/welcome");
}, "/Users/luisherdeth/Documents/ClimaWiki/src/pages/map.astro", void 0);

const $$file = "/Users/luisherdeth/Documents/ClimaWiki/src/pages/map.astro";
const $$url = "/map";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Map,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
