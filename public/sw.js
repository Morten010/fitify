if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"962e2564896f55ec1a80852f0c2eccbc"},{url:"/_next/static/04S3znKRQ45ViYQ32DZVE/_buildManifest.js",revision:"66a650a40453999ca40002ee32e3481e"},{url:"/_next/static/04S3znKRQ45ViYQ32DZVE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-9728625a6d43b3c9.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/108-a4d477d554c998aa.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/222-d70ff80a55999c78.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/251-e1e723e5f4fb46fe.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/263-a09d39c677c9d617.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/3627521c-7b0e9092ecad9c91.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/387-e22c8984b45fc559.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/596-3997922aabb7b0a0.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/613-1665775f460fded7.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/685-2851b0d52e20f01a.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/726-ff808cccd9774efe.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/731-1836f509727a64f0.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/749-93a7f79b247a8bf6.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/768-e277579efe8f9a27.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/77-81074c71658dc0e6.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/9081a741-f4c1bcbd3706b02c.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/943-203b58c17ac22c0c.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/951-8f2c7b6c1e33d596.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/create/page-ec128c59bf255fab.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/edit/%5Bid%5D/page-abcf9face690e193.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/layout-7f55028f685aa793.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/page-76d4568d7dbbdc61.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/workouts/%5Bid%5D/%5Bday%5D/page-db79239fc22e2cb7.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(app)/workouts/%5Bid%5D/page-3899afb586d20667.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(auth)/layout-6732752469ce2837.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(auth)/login/page-42961d01dc2d4b16.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/(auth)/signup/page-efe83c0a415669a6.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/app/layout-5c667c2e45d09302.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/fd9d1056-79d03cbe031295b7.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/main-69bee79c3c580274.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/main-app-3a3afc71f3962ae0.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e4171833e7fa7759.js",revision:"04S3znKRQ45ViYQ32DZVE"},{url:"/_next/static/css/57ef2dda25161d55.css",revision:"57ef2dda25161d55"},{url:"/_next/static/media/2aaf0723e720e8b9-s.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca-s.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8-s.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a-s.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb-s.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7-s.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127-s.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/auth-bg.jpg",revision:"c81a18cdc1680a916e814fb737775731"},{url:"/favicon.ico",revision:"664eca1a404f5c3e6797e58c1b30dac4"},{url:"/icon-192x192.png",revision:"9333f8af5488066f3026b8b45428057a"},{url:"/icon-256x256.png",revision:"1fd8e4c019e3ab11f84662dfc898241e"},{url:"/icon-384x384.png",revision:"d06dd2387a91b70db96fae73305c1ad3"},{url:"/icon-512x512.png",revision:"d66f1960e788815fbb90d64aafc301d6"},{url:"/manifest.json",revision:"9f0f5cdb195e90fd4e8d85d7b43e436e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/red-bg.jpg",revision:"6ca58d5b6a139e1b94ae893785c3b8e7"},{url:"/thumbnail.jpg",revision:"5ebfbe5fe47b4ab1a53204d7f3316587"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
