console.log('Service Worker Registered!');




self.addEventListener('install', function(event){
	const cacheFiles = [
'index.html',
'restaurant.html',
'css/styles.css',
'data/restaurants.json',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
'js/dbhelper.js',
'js/restaurant_info.js'
];


	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);

});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response){
			if (response) return response;
			return fetch(event.request)
			.then(function(response){
				const clonedResponse = response.clone();
				caches.open('v1').then(function(cache){
					cache.put(event.request, clonedResponse);
				})
				return response;
			})
			.catch(function(err){
				console.log("cache update failed!")
			})
		})
		);

});