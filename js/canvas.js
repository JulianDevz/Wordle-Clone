//Dibujar tablero canvas
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
pincel.fillStyle = "#E9ECF8";
pincel.fillRect(0,0,330,400);
pincel.strokeStyle = "#E9ECF8";
pincel.strokeRect(0,0,330,400);

//Cuadros para las letras
function crearCuadro(x,y){
    pincel.beginPath();
    pincel.fillStyle = "#E9ECF8";
    pincel.fillRect(x,y,60,60);
    pincel.strokeStyle = "black";
    pincel.strokeRect(x,y,60,60);
}

function dibujarFilaCuadros(){
    var espacio2 = 0;
    for(x = 0; x < 6; x++){
        var espacio = 0;
        for(y = 0; y < 5; y++){
            crearCuadro(1 + espacio, 1 + espacio2);
            espacio = espacio + 66;
        }
        espacio2 = espacio2 + 66;
    }
} dibujarFilaCuadros();

function dibujarTexto(texto,x,y,color){
    pincel.beginPath();
    pincel.font = "400 25pt Poppins";
    pincel.fillStyle = color;
    pincel.fillText(texto,x,y);
}

function dibujarLetra(letra,fila,array){
    largoArray = array.length;
    var contador = 0;
    for(var x = 1; x <= 6; x++){
    
        if(largoArray == 1 && fila == x){
            dibujarTexto(letra,20,43 + contador, "black");
        }else if(largoArray == 2 && fila == x){
            dibujarTexto(letra,85,43 + contador, "black");
        }else if(largoArray == 3 && fila == x){
            dibujarTexto(letra,152,43 + contador, "black");
        }else if(largoArray == 4 && fila == x){
            dibujarTexto(letra,217,43 + contador, "black");
        }else if(largoArray == 5 && fila == x){
            dibujarTexto(letra,284,43 + contador, "black");
        }
        contador += 66;
    }
}


function eliminarLetra(fila,array){
    largoArray = array.length;
    var contador = 0;
    for(var x = 1; x <= 6; x++){
        if(largoArray == 0 && fila == x){
            pincel.clearRect(2,2 + contador,58,58);
        }else if(largoArray == 1 && fila == x){
            pincel.clearRect(68,2 + contador,58,58);
        }else if(largoArray == 2 && fila == x){
            pincel.clearRect(134,2 + contador,58,58);
        }else if(largoArray == 3 && fila == x){
            pincel.clearRect(200,2 + contador,58,58);
        }else if(largoArray == 4 && fila == x){
            pincel.clearRect(266,2 + contador,58,58);
        }else if(largoArray == 5 && fila == x){
            pincel.clearRect(332,2 + contador,58,58);
        }
        contador += 66;
    }
}

function validarTextoFila(fila){

    var largoTexto = palabraRandom.length
    var arrayLetrasSecretas = [];

    //Guardamos la palabra secreta dentro del array letras secretas
    for(var indiceTexto = 0; indiceTexto < largoTexto; indiceTexto++){
        arrayLetrasSecretas.push(palabraRandom.charAt(indiceTexto));
    }

    //Pintas los cuadros segun corresponda
    var contador2 = 0;
    for(var x = 1; x <= 6; x++){
        var contador = 0;
        for(var y = 0; y <= 4; y++){
            if((arrayLetras[y] == arrayLetrasSecretas[y]) && (fila == x)){
                pincel.fillStyle = "#6AAA64";
                pincel.fillRect(2 + contador,2 + contador2,58,58);
            }else if(arrayLetrasSecretas.includes(arrayLetras[y]) && fila == x){
                pincel.fillStyle = "#C9B458";
                pincel.fillRect(2 + contador,2 + contador2,58,58);
            }else if(fila == x){
                pincel.fillStyle = "#787C7E";
                pincel.fillRect(2 + contador,2 + contador2,58,58);
            }

            //Reponer las letras
            if(fila == x){
                dibujarTexto(arrayLetras[y],20 + contador,43 + contador2, "#ffffff");
            }

            contador += 66;
        }
        contador2 += 66;
    }
    
}

var cantidadEnter = 0;
var arrayLetras = [];
var fila = 1;
var largoArrayLetras;

document.addEventListener("DOMContentLoaded",function(){
    sortearPalabra(palabraSecreta);
});

document.addEventListener('keydown',function(evento){
    codigo = evento.keyCode;
    letra = evento.key.toUpperCase();

    largoArrayLetras = arrayLetras.length;
    
    if((codigo >= 65 && codigo <= 90 || codigo == 192) && (largoArrayLetras < 5)){
        arrayLetras.push(letra);
        dibujarLetra(letra,fila,arrayLetras);
    }
    if(codigo == 8){ //Si se oprime el boton eliminar
        arrayLetras.pop();
        eliminarLetra(fila,arrayLetras); 
    }
    if(codigo == 13 && largoArrayLetras == 5){
        validarTextoFila(fila);
        fila++;

        //Validar si gano o perdio
        var palabraUsuario = arrayLetras.join('');
        if(palabraUsuario == palabraRandom){
            alert("Felicidades has ganado el juego!!")
        }else if(fila == 7 && palabraUsuario != palabraRandom){
            alert("Has perdido el juego, la palabra correcta era: " + palabraRandom)
        }      

        arrayLetras.length = 0;
    }else if(codigo == 13 && largoArrayLetras < 5){
        alert("Faltan letras");
    }
});


