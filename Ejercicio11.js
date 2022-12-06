class MiGeolocalizacion {

    
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),this.verErrores.bind(this));
    }


    getPosicion(posicion){
        this.mensaje          = "Cargada la geolocalización de forma correcta";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "No se ha permitido la geolocalización.";
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Error,información no disponible";
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado";
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido";
            break;
        }
    }

    getLongitud(){
        return this.longitud;
    }
    getPrecision(){
        return this.precision;
    }
    getPrecisionAltitud(){
        return this.precisionAltitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    getRumbo(){
        return this.rumbo;
    }
    getVeloc(){
        return this.velocidad;
    }


    verTodo(elemento){
        var ubicacion=document.getElementById(elemento);
        var datos = this.mensaje;
        datos+='<p>Longitud: '+ this.getLongitud() +' grados</p>'; 
        datos+='<p>Latitud: '+this.getLatitud() +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.getPrecision() +' metros</p>';
        datos+='<p>Altitud: '+ this.getAltitud() +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.getPrecisionAltitud() +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.getRumbo() +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.getVeloc() +' metros/segundo</p>';
        ubicacion.innerHTML = datos;

       

    }


    mapa(elemento){
        var ubicacion=document.getElementById(elemento);
        var apiKey = "&key=AIzaSyBxVlKPexsIaVFNvQzJcFsWE_gYQY0Hl88";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.mapaImg = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        ubicacion.innerHTML = "<img src='"+this.mapaImg+ "' alt='mapa estático google' />";
    }
}

var posicion = new MiGeolocalizacion();