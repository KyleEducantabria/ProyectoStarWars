"use strict";

$(document).ready(function () {

    $("body").append('<h1 class="titulo"> StarWars </h1>');

    const personajes = ["Chewbacca", "Darth Vader", "R2-D2", "C-3PO", "Yoda"];

    const div = $('<div class="cartas">');

    for (let i = 0; i < personajes.length; i++) {
        let enlace = $('<a class="carta">');
        let nombre = $("<h3>");
        let imagen = $("<img>");

        enlace.attr("id", i);
        nombre.text(personajes[i]);
        imagen.attr("src", `../recursos/img/${i+1}.jpeg`);

        enlace.append(nombre);
        enlace.append(imagen);
        div.append(enlace);
    }

    $("body").append(div);

    $("a").click(function () {
        cargarDatos();
    });

});


function cargarDatos(){
    //crear div nuevo con los datos



}