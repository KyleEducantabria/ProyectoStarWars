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
            //Creo un div en el que voy a guardar los datos, y un div para cada fila.
            //Tendré una fila si solo recojo 3 datos, y dos si recojo 4 o más.
            const divDatos = $('<div class="datos">');
            const divFilaUno = $('<div class="fila-uno">');
            const divFilaDos = $('<div class="fila-dos">');

            


        }
    });


}