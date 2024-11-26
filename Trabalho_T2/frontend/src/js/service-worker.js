self.addEventListener('install', event => {
    console.log('Service Worker installing.');
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
  });
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const promiseChain = clients.openWindow('./');
    event.waitUntil(promiseChain);
  });
  
  self.addEventListener('push', function (event) {
    const data = event.data?.json() ?? {};
    let message = data.message || 'Default message';
    
    event.waitUntil(
      self.registration.showNotification('Mensagem da sua app maravilhosa', {
        body: message,
        tag: 'swc'
      })
    );
  });
  