if('serviceWorker' in navigator){

	navigator.serviceWorker.register("sw.js").then(reg =>console.log("funciona correctamente",reg))
	.catch(error => console.warn("Error en el serviceWorker",error))
}