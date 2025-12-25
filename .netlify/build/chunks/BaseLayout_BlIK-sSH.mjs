import { c as createComponent, d as createAstro, f as addAttribute, j as renderHead, k as renderSlot, r as renderTemplate } from './astro/server_CoLVhjdj.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "ClimaWiki - Weather Forecast You Can Trust",
    description = "Reliable, clear, and transparent weather forecasts. Know what's coming, when it's coming."
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><meta name="description"${addAttribute(description, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- PWA Meta Tags --><meta name="theme-color" content="#1a202c"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="bg-slate-900 text-white antialiased min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/luisherdeth/Documents/ClimaWiki/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
