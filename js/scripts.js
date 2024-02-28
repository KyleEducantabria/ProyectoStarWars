"use strict";

$(document).ready(function () {

    //Primero, añado un h1 de clase título al body.
    $("body").append('<h1 class="titulo"> StarWars </h1> <hr>');

    //Después creo un array con los cinco personajes a sacar y un div que contendrá las cartas.
    const personajes = ["Chewbacca", "Darth Vader", "R2-D2", "C-3PO", "Yoda"];

    const divCartas = $('<div class="cartas">');

    //Por cada personaje que haya en el array: 
    for (let i = 0; i < personajes.length; i++) {
        //1. Creo un enlace, un nombre y una imagen.
        let enlace = $('<a class="carta">');
        let nombre = $("<h3>");
        let imagen = $("<img>");

        //2. Asigno un id al enlace que será el nombre del personaje, 
        //asigno al texto el nombre del personaje 
        //y a la imagen la vinculo al path donde se encuentra la imagen guardada.
        enlace.attr("id", personajes[i]);
        nombre.text(personajes[i]);
        imagen.attr("src", `../recursos/img/${i+1}.jpeg`);

        //Finalmente, al elemento enlace que contiene la carta le añado el nombre y la imagen.
        enlace.append(nombre);
        enlace.append(imagen);
        //Entonces, añado el elemento enlace al div que contiene las cartas.
        divCartas.append(enlace);
    }

    //Añado el div que contiene las cartas al body.
    $("body").append(divCartas);

    //Como todas las cartas son un elemento <a> (enlace), les asigno una función click.
    //Cada vez que se haga click, se pasa a la función cargarDatos con el parámetro del texto que está en la carta.
    //Con ese texto podré hacer luego la llamada al json.
    $("a").click(function () {
        cargarDatos($(this).text());
    });

});


function cargarDatos(personaje){
    //Solicito los datos con una petición AJAX. 'personaje' es el parámetro que recibo.
    $.ajax({
        url: `https://swapi.dev/api/people/?search=${personaje}&format=json`,
        dataType: 'json',
        success: function(datos) {
            //Si el div de clase datos existe, lo borro antes de hacer nada
            $('.datos').remove();

            //Creo un div en el que voy a guardar los datos, y un div para cada fila.
            //Tendré un máximo de tres datos en cada fila, y para añadir los relevantes solo necesito 5 campos de datos, así que creo divs para dos filas.
            const divDatos = $('<div class="datos">');
            const divFilaUno = $('<div class="fila-uno">');
            const divFilaDos = $('<div class="fila-dos">');

            //Creo un div para cada tipo de datos. Datos generales del personaje, datos de su planeta de origen... etc.
            const divGenerales = $('<div>');
            const divOrigen = $('<div>');
            const divApariciones = $('<div>');
            const divNave = $('<div>');
            const divVehiculo = $('<div>');

            //Meto en una variable los resultados obtenidos de ese personaje para que sea más fácil acceder a ellos.
            //Así no tengo que poner datos.results[0].parametro todo el rato.
            const resultados = datos.results[0];

            //Hago una variable para el párrafo que se añadirá al div, y otra para el título.
            let parrafo;
            let titulo;

            /* Datos que van en la primera fila */
            /* Información del personaje */
            //Primero, pongo un título dentro del div y lo añado con append.
            titulo = $("<h2>").append("Información del personaje");
            titulo.appendTo(divGenerales);

            //Después, creo un párrafo con los parámetros que he considerado relevantes en cada caso, y los añado al div uno por uno.
            parrafo = $("<p>").append("Nombre: " + resultados.name);
            parrafo.appendTo(divGenerales);

            parrafo = $("<p>").append("Año de nacimiento: " + resultados.birth_year);
            parrafo.appendTo(divGenerales);

            parrafo = $("<p>").append("Color de ojos: " + resultados.eye_color);
            parrafo.appendTo(divGenerales);

            parrafo = $("<p>").append("Género: " + resultados.gender);
            parrafo.appendTo(divGenerales);

            parrafo = $("<p>").append("Color de pelo: " + resultados.hair_color);
            parrafo.appendTo(divGenerales);
            
            parrafo = $("<p>").append("Altura: " + resultados.height + "cm");
            parrafo.appendTo(divGenerales);

            parrafo = $("<p>").append("Peso: " + resultados.mass + "kg");
            parrafo.appendTo(divGenerales);

            //Al llegar al campo de especie, hay algunos que no tienen, por lo que no hay array.
            //Si la longitud del array species es 0, es decir, no hay nada, escribo que la especie es desconocida.
            //Si no, hago una petición al JSON otra vez, ya que los datos de la especie están en otro link del JSON, y de ahí lo añado.
            if(resultados.species.length == 0){
                parrafo = $("<p>").append("Especie: desconocida");
                parrafo.appendTo(divGenerales);
            } else {
                $.get(`${resultados.species[0]}`, function(especie){
                    parrafo = $("<p>").append("Especie: " + especie.name);
                    parrafo.appendTo(divGenerales);
                });
            }
            
            //Finalmente, añado al div de la primera fila el contenido del div de datos generales.
            $(divFilaUno).append(divGenerales);
            

            
            /* Información del planeta natal */
            //Primero, pongo un título dentro del div y lo añado con append.
            titulo = $("<h2>").append("Información del planeta natal");
            titulo.appendTo(divOrigen);

            //Hago una petición al JSON, ya que los datos del planeta están en un JSON separado.
            //Con lo que obtengo de ese JSON muestro los datos que considero más relevantes.
            $.get(`${resultados.homeworld}`, function(planeta){
                parrafo = $("<p>").append("Planeta natal: " + planeta.name);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Población: " + planeta.population);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Periodo de rotación: " + planeta.rotation_period);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Periodo de órbita: " + planeta.orbital_period);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Diámetro: " + planeta.diameter + "km");
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Clima: " + planeta.climate);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Terreno: " + planeta.terrain);
                parrafo.appendTo(divOrigen);

                parrafo = $("<p>").append("Gravedad: " + planeta.gravity);
                parrafo.appendTo(divOrigen);
            });
            
            //Finalmente, añado al div de la primera fila el contenido del div de planeta natal.
            $(divFilaUno).append(divOrigen);


            /* Información de las películas en las que sale */
            //Primero, pongo un título dentro del div y lo añado con append.
            titulo = $("<h2>").append("Apariciones");
            titulo.appendTo(divApariciones);

            //Al llegar al campo de películas, hay algunos que no salen en ellas, por lo que no hay array.
            //Si la longitud del array species es 0, es decir, no hay nada, no pongo nada.
            //Si no, hago una petición al JSON otra vez, ya que los datos de las películas están en otro link del JSON, y de ahí lo añado.
            if(resultados.films != 0){
                //Por cada película en la que salga hago una petición, ya que cada una tiene su propio JSON, y añado los títulos.
                for(let i = 0; i < resultados.films.length; i++){
                    $.get(`${resultados.films[i]}`, function(pelicula){
                        parrafo = $("<p>").append(pelicula.title);
                        parrafo.appendTo(divApariciones);
                    });
                }
            }

            //Finalmente, añado al div de la primera fila el contenido del div de planeta natal.
            $(divFilaUno).append(divApariciones);

            //Los datos generales, los de planeta de origen y los de películas componen la primera fila.
            //Por lo tanto, una vez recogidos, añado el div de fila uno al div que contiene todos los datos.
            $(divDatos).append(divFilaUno);


            /* Datos que van en la segunda fila */
            /* Información de naves */
            //Primero, pongo un título dentro del div y lo añado con append.
            titulo = $("<h2>").append("Naves");
            titulo.appendTo(divNave);

            //Este proceso es el mismo que en el de las películas.
            //Algunos personajes no tienen nave propia, así que realizo el mismo tratamiento que con películas.
            //En este también tengo que buscar los datos en un JSON separado por cada nave que tenga, ya que ahí es donde están los datos de las naves.
            //Si no tiene ninguna nave, solo añado un párrafo que indica que no tiene nave.
            if(resultados.starships != 0){
                for(let i = 0; i < resultados.starships.length; i++){
                    $.get(`${resultados.starships[i]}`, function(naves){
                        parrafo = $("<p>").append("Nombre: " + naves.name);
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Modelo: " + naves.model);
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Clase: " + naves.starship_class);
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Pasajeros: " + naves.passengers);
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Manufacturador: " + naves.manufacturer);
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Precio: " + naves.cost_in_credits + " créditos");
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Largo: " + naves.length + " metros");
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Velocidad máxima: " + naves.max_atmosphering_speed + " m/s");
                        parrafo.appendTo(divNave);

                        parrafo = $("<p>").append("Capacidad de carga: " + naves.cargo_capacity + " kg");
                        parrafo.appendTo(divNave);

                        parrafo = $("<br>");
                        parrafo.appendTo(divNave);
                    });
                }
            } else {
                parrafo = $("<p>").append("Sin nave");
                parrafo.appendTo(divNave);
            }

            //Finalmente, añado al div de la segunda fila el contenido del div de la nave.
            $(divFilaDos).append(divNave);


            /* Información de vehículos */
            //Primero, pongo un título dentro del div y lo añado con append.
            titulo = $("<h2>").append("Vehículos");
            titulo.appendTo(divVehiculo);

            //Este proceso es el mismo que en el de las películas.
            //Algunos personajes no tienen vehículo propio, así que realizo el mismo tratamiento que con películas.
            //En este también tengo que buscar los datos en un JSON separado por cada vehículo que tenga, ya que ahí es donde están los datos de los vehículos.
            //Si no tiene ningún vehículo, solo añado un párrafo que indica que no tiene vehículo.
            if(resultados.vehicles != 0){
                for(let i = 0; i < resultados.vehicles.length; i++){
                    $.get(`${resultados.vehicles[i]}`, function(vehiculo){
                        parrafo = $("<p>").append("Nombre: " + vehiculo.name);
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Modelo: " + vehiculo.model);
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Clase: " + vehiculo.vehicle_class);
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Pasajeros: " + vehiculo.passengers);
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Manufacturador: " + vehiculo.manufacturer);
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Precio: " + vehiculo.cost_in_credits + " créditos");
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Largo: " + vehiculo.length + " metros");
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Velocidad máxima: " + vehiculo.max_atmosphering_speed + " m/s");
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<p>").append("Capacidad de carga: " + vehiculo.cargo_capacity + " kg");
                        parrafo.appendTo(divVehiculo);

                        parrafo = $("<br>");
                        parrafo.appendTo(divVehiculo);
                    });
                }
            } else {
                parrafo = $("<p>").append("Sin vehículos");
                parrafo.appendTo(divVehiculo);
            }

            //Finalmente, añado al div de la segunda fila el contenido del div de vehículo.
            $(divFilaDos).append(divVehiculo);

            //Como ya he terminado con los datos que voy a meter, añado filaDos al contenido del div de datos con un append.
            $(divDatos).append(divFilaDos);

            //Finalmente, añado el div de datos entero al body con un append.
            $("body").append(divDatos);
        }
    });




}