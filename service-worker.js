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
    { url: "/nav.html", revision: '1' },
    { url: "/detail-team.html", revision: '1' },
    { url: "/pages/champion.html", revision: '1' },
    { url: "/pages/inggris.html", revision: '1' },
    { url: "/pages/jerman.html", revision: '1' },
    { url: "/pages/perancis.html", revision: '1' },
    { url: "/pages/spanyol.html", revision: '1' },
    { url: "/pages/saved.html", revision: '1' },
    { url: "/css/materialize.min.css", revision: '1' },
    { url: "/js/materialize.min.js", revision: '1' },
    { url: "/js/nav.js", revision: '1' },
    { url: "/js/api.js", revision: '2' },
    { url: "/js/db.js", revision: '1' },
    { url: "/js/idb.js", revision: '1' },
    { url: "/js/reg_sw.js", revision: '1' },
    { url: "/js/detail.js", revision: '1' },
    { url: "/icon.png", revision: '1' },
    { url: "/img/192.png", revision: '1' },
    { url: "/img/512.png", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/img/favicon.ico", revision: '1' },
    { url: "/img/apple-touch-icon.png", revision: '1' }
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
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);