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
palabras[1] = ["ARROJA", "ANDREA", "JANDRO", "CIEGOS", "GORDOS", "PABLOS", "JANDROS", "LUCHOS", "CHICLE", "ESPADA"];
palabras[2] = ["DESAYUNA", "FLUYAMOS", "MARACUYA", "PAPAGALO", "MATABUEY", "PETABYTE", "PLAYEROS", "SUBRAYAR", "TROYANOS", "CEGUERAS"];

function finalizarJuego() {
    document.getElementById('nueva').disabled = true;
    document.getElementById('palabra').disabled = true;
    document.getElementById('solucion').disabled = true;
    document.getElementById('finalizar').disabled = true;

    var devolver = document.getElementById('resultado');
    var porcentajeAciertos = partidas > 0 ? Math.round((aciertos / partidas) * 100) : 0;

    devolver.innerHTML = "Has acertado el " + porcentajeAciertos + "%";
}

function resolverProblema() {
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
    } else if (opcionLetras === "6") {
        palabraElegida = palabras[1][columna];
    } else {
        palabraElegida = palabras[2][columna];
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

function teclear(event) {
    var devolver = document.getElementById('resultado');
    var tecla = event.key.toUpperCase();
    var palabraEscrita = document.getElementById('palabra').value.toUpperCase();
    document.getElementById('palabra').value = palabraEscrita;
    if (palabraEscrita === palabraElegida) {
        devolver.innerHTML = "Se ha acertado la palabra " + palabraElegida;
        devolver.style.visibility = 'visible';
        document.getElementById('nueva').disabled = false;
        document.getElementById('palabra').disabled = true;
        aciertos++;
    }

    partidas++;
}

function cargarPagina() {
    var inputLetras = document.getElementById('letras');
    document.getElementById('palabra').focus();
    document.querySelector('input[name="opcionesLetras"][value="4"]').checked = true;
    var opcionLetras = document.querySelector('input[name="opcionesLetras"]:checked').value;

    var columna = Math.round(Math.random() * 10);
    if (opcionLetras === "4") {
        palabraElegida = palabras[0][columna];
    } else if (opcionLetras === "6") {
        palabraElegida = palabras[1][columna];
    } else {
        palabraElegida = palabras[2][columna];
    }

    var elegida = desordenarPalabra(palabraElegida);
    inputLetras.value = elegida;
    inputLetras.disabled = true;

    document.getElementById('nueva').disabled = false;
}

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
