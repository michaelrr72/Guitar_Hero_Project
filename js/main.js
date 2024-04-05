var contenedor = document.querySelector(".contenedor");
var alturaContenedor = document.querySelector('.contenedor').offsetHeight;
var pauseButton = document.querySelector('.play-pause');
let pausado = false;

function crearNota(i) {
    var nuevaNota = document.createElement("div");
    nuevaNota.setAttribute("class", "nota nota-" + i);
    nuevaNota.dataset.velocidad = Math.random() * 10 + 1; // Asegurar que la velocidad no sea 0
    // Asignar un marginTop inicial para cada nota para evitar que se superpongan
    nuevaNota.style.marginTop = `-${i * 100}px`;
    nuevaNota.innerHTML = i;
    contenedor.appendChild(nuevaNota);
}

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
            nota.remove(); // Eliminar la nota del DOM
        }
    });
}

function generarNotasContinuamente() {
    // Define un intervalo para la generación de notas
    var intervaloDeNotas = setInterval(function() {
        var i = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6 para el tipo de nota
        crearNota(i);
    }, 1000); // Crea una nota cada 1000 milisegundos (1 segundo)

    // Para detener la generación de notas, usa clearInterval(intervaloDeNotas);
    // Podrías llamar a clearInterval cuando el juego se pause o termine
}

function start() {
    // Limpiar el contenido previo para reiniciar el juego
    contenedor.innerHTML = '';
    pausado = false;
    // Crear notas iniciales
    for (i = 1; i <= 6; i++) {
        crearNota(i);
    }
    intervalo = setInterval(moverNotas, 10);
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
    console.log(evt.key)
    var hitZonePosition = alturaContenedor - 50; // for example, 50px from the bottom of the container
    var notes = document.querySelectorAll(".nota");

    notes.forEach(function (nota) {
        var notePosition = parseFloat(nota.style.marginTop.replace('px', ''));
        // Check if the note is within the hit zone
        if (notePosition > hitZonePosition - 10 && notePosition < hitZonePosition + 10) {
            if (evt.key === nota.getAttribute('data-key')) {
                // This is a hit
                nota.remove(); // Remove the note from the DOM
                increaseScore();
                increaseStreak();
            } else {
                // This is a miss
                resetStreak();
            }
        }
    });

    if (evt.key === "q") {
        start();
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
