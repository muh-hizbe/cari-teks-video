importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
workbox.loadModule('workbox-strategies');

if (workbox) {
    console.log("workbox has been loaded");
}else {
    console.log("workbox didn't load");
}

workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/css/styles.css", revision: '1' },
    { url: "/images/icons/icon-72x72.png", revision: '1' },
    { url: "/images/icons/icon-92x92.png", revision: '1' },
    { url: "/images/icons/icon-128x128.png", revision: '1' },
    { url: "/images/icons/icon-144x144.png", revision: '1' },
    { url: "/images/icons/icon-152x152.png", revision: '1' },
    { url: "/images/icons/icon-192x192.png", revision: '1' },
    { url: "/images/icons/icon-384x384.png", revision: '1' },
    { url: "/images/icons/icon-512x512.png", revision: '1' },
    { url: "/js/index.js", revision: '1' },
    { url: "/js/vue.js", revision: '1' },
    { url: "/js/reg_sw.js", revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});    

workbox.routing.registerRoute(
  /^https:\/\/cari-teks-video-api\.vercel\.app/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'data-fetch',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 40,
        maxAgeSeconds: 10 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'vuejs-cdn',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/unpkg\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'tailwindcss-cdn',
  })
);