var CACHE_NAME = 'pwa-sample-cache-v2';
var urlsToCache = [
    '/',
    '/manifest.json',
    '/css/style.css',
    '/js/serviceworker.js',
    '/js/count.js',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

// ServiceWorkerが有効になるときcacheNameがちがうキャッシュを削除する
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(
          keyList.map(function(key) {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    return self.clients.claim();
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    if (
        event.request.cache === "only-if-cached" &&
        event.request.mode !== "same-origin"
    ) {
        return;
    }
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});

// プッシュ通知を受け取る
self.addEventListener("push", function(event) {
    console.log("Push Notification Recieved", event);
    if (Notification.permission == "granted") {
        event.waitUntil(self.registration.showNotification(
            "受信しました", {
                body: "お知らせです。",
                icon: "/images/icon.jpg"
        }).then(function(showEvent) {}, function(error) {
                console.log(error);
            }
        ));
    }
});

// プッシュ通知をクリック
self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("https://watanabe0601.github.io/sw.github.io/02/")
    );
});
