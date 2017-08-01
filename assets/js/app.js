function buscar(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(found, notFound);
	}
}
window.addEventListener("load", buscar); 

var latitud, longitud;
var found = function(posicion){
	latitud = posicion.coords.latitude;
	longitud = posicion.coords.longitude;
	console.log(latitud);
	console.log(longitud);
	clima(latitud,longitud);
}
var notFound = function(error){
	alert("No pudimos encontrar tu ubicación");
}
/*API DARK SKY*/ 

function clima(latitud,longitud){
	console.log(latitud); //pruebas otras
	$.ajax({
		url: 'https://api.darksky.net/forecast/c290dc0e0d6dec4c86f6d8417d5b5470/'+latitud+','+longitud+'?language=es?&units=auto',
		type: 'GET',
		datatype: 'JSONP',
	})
	.done(function(data) {
            console.log(data);
            $('.mostrar').append('<p>Hola'+data.currently.apparentTemperature+'</p>');
        })
        .fail(function() {
            console.log('Error al conectar a la Api')
        })
        .always(function() {
            console.log('Completado')
    });
}