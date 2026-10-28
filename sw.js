const C='hisab-v4',P=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const X=['fonts.googleapis.com','fonts.gstatic.com','www.gstatic.com'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(P)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.origin===location.origin){e.respondWith(fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(k=>k.put(r,c)).catch(()=>{})}return n}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
 if(X.includes(u.hostname)){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok||n.type==='opaque'){const c=n.clone();caches.open(C).then(k=>k.put(r,c)).catch(()=>{})}return n})))}});
