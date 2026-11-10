// Service worker do Pingo: só cuida das notificações (não guarda nada em cache, para as atualizações chegarem na hora).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { titulo: 'Pingo', texto: e.data ? e.data.text() : '' }; }
  const op = {
    body: d.texto || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/badge-96.png',
    lang: 'pt-BR',
    data: { url: './', tipo: d.tipo || '' }
  };
  if (d.tag) { op.tag = d.tag; op.renotify = true; }
  e.waitUntil(self.registration.showNotification(d.titulo || 'Pingo', op));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const janelas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of janelas) {
      if ('focus' in c) { await c.focus(); return; }
    }
    if (self.clients.openWindow) await self.clients.openWindow('./');
  })());
});
