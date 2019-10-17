
var CACHE_NAME = 'v1_pruebasPWA',
urlsToCache = [
  '/',
  './estilos.css',
  './script.js',
  './favicon.png'
]

self.addEventListener("install",e => {

   e.waitUntil(
   	caches.open(CACHE_NAME).then(cache=>{
   		return cache.addAll(urlsToCache).then(
   			()=>self.skipWaiting())

   	})
   	.catch(error=>("Falló registro de cache ",error))
   	)
})
//cuando no hay conexión de internet
self.addEventListener("activate",e => {

	const cacheWhiteList = [CACHE_NAME]
	e.waitUntil(
		caches.keys()
		.then(cachesNames => {
			cacheNames.map(cacheName => {
				if(cacheWhiteList.indexOf(cacheName)=== -1){
					return caches.delete(cacheName)
				}
			})
			})
		
		.then(() => self.clients.claim())
	)	
})
//cuando el navegador recupera url
self.addEventListener("fetch",e =>{


	e.respondWith(

		caches.match(e.request)
		.then(res =>{
			if(res){
				//recuperar del caché
			 return res
			}
			//recuperar de la petición de la url
			return fetch(e.request)
		})
	)
	
})

