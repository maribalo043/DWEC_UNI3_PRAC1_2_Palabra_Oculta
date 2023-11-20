window.addEventListener('load', cargarPagina);
document.getElementById('palabra').addEventListener('keyup', teclear);
document.getElementById('nueva').addEventListener('click', nuevaPalabra);
document.getElementById('solucion').addEventListener('click', resolverProblema);
document.getElementById('finalizar').addEventListener('click', finalizarJuego);

var palabraElegida = "";
var partidas = 0;
var aciertos = 0;
var palabras = [];
palabras[0] = ["CASA", "PELO", "OJOS", "PERO", "PENA", "SOGE", "VIVE", "RAFA", "GAYO", "BAJO"];
palabras[1] = ["ARROJA", "ANDREA", "JANDRO", "CIEGOS", "GORDOS", "PABLOS", "JANDR2", "LUCHOS", "CHICLE", "ESPADA"];
palabras[2] = ["DESAYUNA", "FLUYAMOS", "MARACUYA", "PAPAGALO", "MATABUEY", "PETABYTE", "PLAYEROS", "SUBRAYAR", "TROYANOS", "CEGUERAS"];

function finalizarJuego() {
    document.getElementById('nueva').disabled = true;
    document.getElementById('palabra').disabled = true;
    document.getElementById('solucion').disabled = true;
    document.getElementById('finalizar').disabled = true;

    var devolver = document.getElementById('resultado'); 
    devolver.style.visibility = "visible";
    var porcentajeAciertos = partidas > 0 ? Math.round((aciertos / partidas) * 100) : 0;

    devolver.innerHTML = "Has acertado el " + porcentajeAciertos + "%";
}

function resolverProblema() {
    partidas++;
    document.getElementById('nueva').disabled = false;
    document.getElementById('palabra').disabled = true;
    document.getElementById('palabra').value = palabraElegida;
    document.getElementById('solucion').disabled = true;
    var devolver = document.getElementById('resultado');
    devolver.style.color = 'red';
    devolver.style.border = '3px solid red';
    devolver.style.visibility = 'visible';
    devolver.innerHTML = "La palabra esperada era " + palabraElegida;
}

function nuevaPalabra() {
    document.getElementById('solucion').disabled = false;
    document.getElementById('palabra').disabled = false;
    document.getElementById('palabra').focus();

    var inputLetras = document.getElementById('letras');
    // Obtener el valor seleccionado del radio
    var opcionLetras = document.querySelector('input[name="opcionesLetras"]:checked').value;

    // Elegir la palabra según la opción seleccionada
    var columna = Math.round(Math.random() * 10);
    if (opcionLetras === "4") {
        palabraElegida = palabras[0][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    } else if (opcionLetras === "6") {
        palabraElegida = palabras[1][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    } else if(opcionLetras === "8"){
        palabraElegida = palabras[2][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    }

    var elegida = desordenarPalabra(palabraElegida);
    inputLetras.value = elegida;
    inputLetras.disabled = true;

    var devolver = document.getElementById('resultado');
    devolver.innerHTML = "";
    devolver.style.visibility = 'hidden';
    devolver.style.color = 'green';
    devolver.style.border = '3px solid #4CAF50';
    document.getElementById('nueva').disabled = true;
    document.getElementById('palabra').value = '';
}
/*Aqui lo que pasa es que cada vez que se teclea, compueba si es correcto ademas de poner a mayusculas
las letras, y siempre entera, es decir con 4 caracteres o 6 o 8, lo comprueba cuando se alcanzan ese 
numero de caracteres */
function teclear() {
    var devolver = document.getElementById('resultado');
    var palabraEscrita = document.getElementById('palabra').value.toUpperCase();
    document.getElementById('palabra').value = palabraEscrita;
    var longitudPalabra = palabraEscrita.length;
    var opcionLetras = document.querySelector('input[name="opcionesLetras"]:checked').value;

    if (palabraEscrita === palabraElegida && longitudPalabra == opcionLetras) {
        devolver.innerHTML = "¡Se ha acertado la palabra " + palabraElegida + "!";
        devolver.style.visibility = 'visible';
        document.getElementById('nueva').disabled = false;
        document.getElementById('palabra').disabled = true;
        aciertos++;
        partidas++;
    } else if(longitudPalabra == opcionLetras){
        partidas++;
    }
}
/*Aqui lo que pasa es que al cargar la pagina, se pone todo activo menos el boton de nueva palabra,
y depende de lo que haya elegido en el nunero de letras te sale una palabra o otra de la lista, ademas 
de que el cursor se pone en el lugar para meter palabras. */
function cargarPagina() {
    var inputLetras = document.getElementById('letras');
    document.getElementById('palabra').focus();
    document.querySelector('input[name="opcionesLetras"][value="4"]').checked = true;
    var opcionLetras = document.querySelector('input[name="opcionesLetras"]:checked').value;

    var columna = Math.round(Math.random() * 10);
    if (opcionLetras === "4") {
        palabraElegida = palabras[0][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    } else if (opcionLetras === "6") {
        palabraElegida = palabras[1][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    } else if(opcionLetras === "8"){
        palabraElegida = palabras[2][columna];
        var ayuda = document.getElementById('palabra');
        ayuda.maxLength = opcionLetras;
    }

    var elegida = desordenarPalabra(palabraElegida);
    inputLetras.value = elegida;
    inputLetras.disabled = true;

    document.getElementById('nueva').disabled = false;
}

/*Funcion que sirve para la palabra que se le pase, la pueda desordenar de forma aleatoria,
y como dentro de esa aleatoriedad, cabe la posibilidad que se salga una palabra igual, si 
es igual se vuelve a realizar la funcion. */
function desordenarPalabra(palabra) {
    var barajada = false;
    while (!barajada) {
        var letras = palabra.split('');
        letras.sort(function () {
            return 0.5 - Math.random();
        });

        var palabraDesordenada = letras.join('');
        if (palabra !== palabraDesordenada) {
            barajada = true;
            return palabraDesordenada;
        }
    }
}
