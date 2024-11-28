// Basic service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== 'dynamic-cache') {
            console.log(`[Service Worker] Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[Service Worker] Cache hit:', event.request.url);
        return cachedResponse;
      }
      console.log('[Service Worker] Fetching from network:', event.request.url);
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          return caches.open('dynamic-cache').then((cache) => {
            cache.put(event.request, networkResponse.clone());
            console.log('[Service Worker] Cached:', event.request.url);
            return networkResponse;
          });
        })
        .catch((error) => {
          console.error('[Service Worker] Fetch failed:', error);
          return new Response('Service unavailable.', { status: 503 });
        });
    })
  );
});

self.addEventListener('push', (event) => {
  const defaultData = {
    title: 'Awesome App Notification',
    body: 'This is a default notification body.',
    icon: '/icon.png',
    tag: 'general',
  };
  const data = event.data?.json() || defaultData;
  console.log('[Service Worker] Push received:', data);
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || defaultData.icon,
      tag: data.tag || defaultData.tag,
      actions: data.actions || [], // Support for notification buttons
      requireInteraction: true, // Keep the notification visible until user interacts
    })
  );
});


const targetUrl = '/'; // Define uma URL de fallback
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.notification.tag);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification closed:', event.notification.tag);
});