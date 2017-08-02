// Coneccion a google maps
function ubicacion(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(found, notFound);
	}
}
window.addEventListener("load", ubicacion); 

var lat, lon;
var found = function(posicion){
	lat = posicion.coords.latitude;
	lon = posicion.coords.longitude;
	console.log(lat);
	console.log(lon);
	clima(lat,lon);
}
var notFound = function(error){
	alert("No pudimos encontrar tu ubicación");
}
/*API DARK SKY*/ 

function clima(lat,lon){
	console.log(latitud); //pruebas
	$.ajax({
		url: 'https://api.darksky.net/forecast/c290dc0e0d6dec4c86f6d8417d5b5470/'+lat+','+lon+'?language=es?&units=auto',
		//url: 'https://api.darksky.net/forecast/c290dc0e0d6dec4c86f6d8417d5b5470/-33.4727879,-70.6298313?language=es?&units=auto',
		type: 'GET',
		datatype: 'JSON',
	})
	.done(function(data) {
            console.log(data);
            $('.mostrar').append('<img src="dist/iconos/'+data.currently.icon+'.png">'+
            	'<h1 class="temp center-align">'+ data.currently.apparentTemperature+'</h1>'+
            	'<h5 class="center-align">Wind: '+data.currently.windSpeed+'</h5>'+
            	'<h5 class="center-align">Humidity: '+data.currently.humidity+'</h5>'+
            	'<h5 class="center-align">UV Index: '+data.currently.uvIndex+'</h5>'+
            	'<h5 class="center-align">Pressure: '+data.currently.pressure+'</h5>'+
            	'<a href="semana.html"><button class="btn" id="semana">PREDICCION DE LA SEMANA</button></a>');
            //var largo = data.daily.data.length;
            //console.log(largo);
            for(var x=0; x<=6; x++){
            	console.log(data.daily.data[x].temperatureMin);
            	console.log(data.daily.data[x].temperatureMax);
            	console.log(data.daily.data[0].temperatureMin);
            $('.semana').append('<img src="dist/iconos/'+data.currently.icon+'.png">'+
            	'<h5 class="center-align">Min: '+data.daily.data[x].temperatureMin+'</h5>'+
            	'<h5 class="center-align">Max: '+data.daily.data[x].temperatureMax+'</h5>'+
            	'<a href="index.html"><button class="btn">REGRESAR</button></a>');
            }
        })
        .fail(function() {
            console.log('Error al conectar a la Api')
        })
        .always(function() {
            console.log('Completado')
    });
}
$('#semana').click(function(){
	console.log("Hice click en boton");
	document.location.href = "semana.html";
}); //No me funciona, quizás problema con la extensión de chrome :( -- Lo haré por HTML



