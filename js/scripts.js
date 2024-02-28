"use strict";

$(document).ready(function () {

    $("body").append('<h1 class="titulo"> StarWars </h1> <hr>');

    const personajes = ["Chewbacca", "Darth Vader", "R2-D2", "C-3PO", "Yoda"];

    const divCartas = $('<div class="cartas">');

    for (let i = 0; i < personajes.length; i++) {
        let enlace = $('<a class="carta">');
        let nombre = $("<h3>");
        let imagen = $("<img>");

        enlace.attr("id", personajes[i]);
        nombre.text(personajes[i]);
        imagen.attr("src", `../recursos/img/${i+1}.jpeg`);

        enlace.append(nombre);
        enlace.append(imagen);
        divCartas.append(enlace);
    }

    $("body").append(divCartas);

    $("a").click(function () {
        cargarDatos($(this).text());
    });

});


function cargarDatos(personaje){
    //Solicito los datos con una petición AJAX
    $.ajax({
        url: `https://swapi.dev/api/people/?search=${personaje}&format=json`,
        dataType: 'json',
        success: function(datos) {
            //Si el div de clase datos existe, lo borro antes de hacer nada
            $('.datos').remove();

            //Creo un div en el que voy a guardar los datos, y un div para cada fila.
            //Tendré una fila si solo recojo 3 datos, y dos si recojo 4 o más.
            const divDatos = $('<div class="datos">');
            const divFilaUno = $('<div class="fila-uno">');
            const divFilaDos = $('<div class="fila-dos">');

            const divGenerales = $('<div>');
            const divOrigen = $('<div>');
            const divApariciones = $('<div>');
            const divNave = $('<div>');
            const divVehiculo = $('<div>');

            const resultados = datos.results[0];

            let parrafo;
            let titulo;

            /* Datos que van en la primera fila */
            /* Información del personaje */
            titulo = $("<h2>").append("Información del personaje");
            titulo.appendTo(divGenerales);

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

            if(resultados.species.length == 0){
                parrafo = $("<p>").append("Especie: desconocida");
            } else {
                $.get(`${resultados.species[0]}`, function(especie){
                    parrafo = $("<p>").append("Especie: " + especie.name);
                    parrafo.appendTo(divGenerales);
                });
            }
            
            $(divFilaUno).append(divGenerales);
            

            
            /* Información del planeta natal */
            titulo = $("<h2>").append("Información del planeta natal");
            titulo.appendTo(divOrigen);

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
            
            $(divFilaUno).append(divOrigen);


            /* Información de las películas en las que sale */
            titulo = $("<h2>").append("Apariciones");
            titulo.appendTo(divApariciones);

            if(resultados.films != 0){
                for(let i = 0; i < resultados.films.length; i++){
                    $.get(`${resultados.films[i]}`, function(pelicula){
                        parrafo = $("<p>").append(pelicula.title);
                        parrafo.appendTo(divApariciones);
                    });
                }
            }

            $(divFilaUno).append(divApariciones);

            $(divDatos).append(divFilaUno);


            /* Datos que van en la segunda fila */
            /* Información de naves */
            titulo = $("<h2>").append("Naves");
            titulo.appendTo(divNave);

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
            }

            $(divFilaDos).append(divNave);


            /* Información de vehículos */
            titulo = $("<h2>").append("Vehículos");
            titulo.appendTo(divVehiculo);

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
            }

            $(divFilaDos).append(divVehiculo);


            $(divDatos).append(divFilaDos);

            $("body").append(divDatos);
        }
    });




}