var palabraSecreta = ['SOLAR','LETRA','GATOS','MENTA','PLAYA','RADIO','RATON','CARTA','FELIZ'];

var palabraRandom;
function sortearPalabra(palabras){
    var numeroRandom = Math.floor(Math.random()*palabras.length);
    palabraRandom = palabras[numeroRandom];
    return palabraRandom;
}

