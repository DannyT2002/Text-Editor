const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route assets specified in the manifest file
precacheAndRoute(self.__WB_MANIFEST);

// Define the CacheFirst strategy for page caching
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with status 0 (opaque responses) and 200 (successful responses)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expire cached responses after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }),
  ],
});

// Precache and warm up the cache with the specified URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigation requests (HTML pages) using the CacheFirst strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching for other types of requests
registerRoute(
  // Match all asset requests
  ({ request }) => ['style', 'script', 'image'].includes(request.destination),
  // Use CacheFirst strategy for asset requests
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      // Cache responses with status 0 (opaque responses) and 200 (successful responses)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Expire cached responses after 30 days
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);
