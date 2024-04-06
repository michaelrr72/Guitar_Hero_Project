var contenedor = document.querySelector(".contenedor");
var alturaContenedor = document.querySelector('.contenedor').offsetHeight;
var pauseButton = document.querySelector('.play-pause');
var teclas = ['A', 'S', 'D', 'J', 'K', 'L'];
let pausado = false;

/*
function crearNota(i) {
    console.log(`.columna[data-key="${i}"]`);
    var contenedorColumna = document.querySelector(`.columna[data-key="${i}"]`);
    
    var nuevaNota = document.createElement("div");
    nuevaNota.setAttribute("class", "nota");
    nuevaNota.dataset.velocidad = (Math.random() * 10) + 1; // Asegurar que la velocidad no sea 0
    // Asignar un marginTop inicial para cada nota para evitar que se superpongan
    nuevaNota.style.marginTop = `-${i * 100}px`;
    nuevaNota.innerHTML = i;
    contenedorColumna.appendChild(nuevaNota);
}*/
function crearNota(tecla) {
    var contenedorColumna = document.getElementById(`columna${tecla}`);
    if (contenedorColumna) {
        var nuevaNota = document.createElement("div");
        nuevaNota.classList.add("nota", `nota-${tecla}`);
        // Agrega aquí cualquier otra configuración inicial para la nota
        contenedorColumna.appendChild(nuevaNota);
    } else {
        console.error("No se encontró el contenedor de la columna para la tecla: " + tecla);
    }
}
/*
function crearNota(tecla) {
    var contenedorColumna = document.getElementById(`columna${tecla}`);
    if (contenedorColumna) {
        var nuevaNota = document.createElement("div");
        nuevaNota.setAttribute("class", "nota " + tecla);
        nuevaNota.dataset.velocidad = (Math.random() * 10) + 1; // Asegurar que la velocidad no sea 0
        // Asignar un marginTop inicial para cada nota para evitar que se superpongan
        nuevaNota.style.marginTop = `-${tecla * 100}px`;
        nuevaNota.innerHTML = tecla;
        contenedorColumna.appendChild(nuevaNota);
    } else {
        console.error("No se encontró el contenedor de la columna para la tecla: " + tecla);
    }
}*/

function moverNotas() {
    var notas = document.querySelectorAll(".nota");
    notas.forEach(function (nota) {
        var velocidadActual = parseFloat(nota.dataset.velocidad);
        var posicionActual = parseFloat(nota.style.marginTop.replace('px', ''));
        var nuevaPosicion = posicionActual + velocidadActual;

        // Mover la nota hacia abajo según su velocidad
        nota.style.marginTop = `${nuevaPosicion}px`;

        // Verificar si la nota ha salido del contenedor
        if (nuevaPosicion > alturaContenedor) {
            //nota.style.marginTop = `-50px`;
            nota.remove(); // Eliminar la nota del DOM
        } else {
            // Mover la nota hacia abajo según su velocidad
            nota.style.marginTop = `${nuevaPosicion}px`;
        }
    });
}

function generarNotasContinuamente() {
    // Define un intervalo para la generación de notas
    setInterval(function () {
        var notaAleatoria = teclas[Math.floor(Math.random() * teclas.length)];
        crearNota(notaAleatoria);
    }, 500); // Crea una nota cada 1000 milisegundos (1 segundo)

    // Para detener la generación de notas, usa clearInterval(intervaloDeNotas);
    // Podrías llamar a clearInterval cuando el juego se pause o termine
}

function manejarPresionDeTecla(teclaPresionada) {
    console.log(teclaPresionada);
    var notas = document.querySelectorAll(`.nota[data-key="${teclaPresionada}"]`);
    notas.forEach(nota => {
        console.log("entramos");
        var posicionNota = parseFloat(nota.style.marginTop.replace('px', ''));
        if (posicionNota > alturaContenedor - 100 && posicionNota < alturaContenedor - 50) {
            // "zona de acierto"
            console.log(`Acierto! Tecla ${teclaPresionada}`);
            nota.remove(); // Eliminar la nota para indicar que fue "tocada"
            increaseScore();
            increaseStreak();
        } else {
            // Este es un error
            resetStreak();
        }
    });
}

function start() {
    pausado = false;

    // Limpiar notas existentes antes de crear las iniciales
    document.querySelectorAll('.columna.nota').forEach(nota => nota.remove());

    // Crear una nota inicial para cada tecla en el arreglo `teclas`
    teclas.forEach(crearNota);

    // Configurar el intervalo para mover las notas
    intervalo = setInterval(moverNotas, 10);

    // Comenzar a generar notas continuamente
    generarNotasContinuamente();
}




pauseButton.addEventListener('click', togglePause);
function togglePause() {
    if (pausado) {
        // Reanudar el juego
        intervalo = setInterval(moverNotas, 10);
        //cancion.play();
        pauseButton.textContent = 'Pausa';
    } else {
        // Pausar el juego
        clearInterval(intervalo);
        //cancion.pause();
        pauseButton.textContent = 'Reanudar';
    }
    pausado = !pausado;
}
function pausa() {
    if (!pausado) {
        togglePause();
    }
}

function reiniciarJuego() {
    // Limpiar el contenedor de notas
    document.querySelectorAll('.columna .nota').forEach(nota => nota.remove());

    // Restablecer puntuación y cualquier otro estado relevante
    document.querySelector('.score').textContent = 'Puntuación: 0';
    document.querySelector('.streak').textContent = 'Racha: 0';
    document.querySelector('.max-streak').textContent = 'Racha Máxima: 0';

    // Detener cualquier música o sonido si es necesario
    // let cancion = document.getElementById('song');
    // cancion.pause();
    // cancion.currentTime = 0; // Reiniciar el tiempo de la canción

    // Detener la generación de notas y cualquier movimiento
    if (typeof intervalo !== 'undefined') {
        clearInterval(intervalo);
    }

    // Reiniciar el juego (esto podría incluir iniciar la música nuevamente y comenzar a generar notas)
    start(); // Asumiendo que `start` es tu función para comenzar el juego
}

/*
// Seguimiento de las teclas
document.addEventListener("keyup", function (evt) {
    console.log(evt.key)
    if (evt.key === "q") {
        start();
    } if (evt.key === "a") {
        clearInterval(intervalo);
        document.querySelector(".nota").style.background = "black";
    } if (evt.key === "s") {
        clearInterval(intervalo);
    } if (evt.key === "d") {
        clearInterval(intervalo);
    } if (evt.key === "j") {
        clearInterval(intervalo);
    } if (evt.key === "k") {
        clearInterval(intervalo);
    } if (evt.key === "l") {
        clearInterval(intervalo);
    } if (evt.key === "p") {
        pausa();
    }
})*/
document.addEventListener("keyup", function (evt) {
    var key = evt.key.toUpperCase();
    if (key === "Q") {
        start();
    }
    if (['A', 'S', 'D', 'J', 'K', 'L'].includes(key)) {
        manejarPresionDeTecla(evt.key);
    }
    if (key === "R") {
        reiniciarJuego();
    }
    if (key === "P") {
        pausa();
    }
});

function increaseScore() {
    var score = parseInt(document.querySelector('.score').textContent.split(': ')[1]);
    score += 10; // for example, each hit is worth 10 points
    document.querySelector('.score').textContent = 'Puntuación: ' + score;
}

function increaseStreak() {
    var streak = parseInt(document.querySelector('.streak').textContent.split(': ')[1]);
    streak += 1;
    document.querySelector('.streak').textContent = 'Racha: ' + streak;
    checkStreakForMultiplier(streak);
}

function resetStreak() {
    document.querySelector('.streak').textContent = 'Racha: 0';
}

function checkStreakForMultiplier(streak) {
    // implement logic for streak multiplier
}


function showHitEffect(nota) {
    nota.style.backgroundColor = 'green'; // change color to green to indicate a hit
}

function showMissEffect() {
    // let's assume you have an element with class '.hit-zone' representing the hit zone
    var hitZone = document.querySelector('.hit-zone');
    hitZone.style.backgroundColor = 'red'; // change color to red to indicate a miss
    setTimeout(function () {
        hitZone.style.backgroundColor = ''; // change back after a short delay
    }, 200);
}

function playNoteSound(noteKey) {
    var audio = new Audio('path_to_audio_file_' + noteKey + '.mp3');
    audio.play();
}
