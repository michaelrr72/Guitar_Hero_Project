/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = getRandomInt(1, 3);
function crearCompetidor(i) {
    const dis = new Map();
    dis.set(1, "40px")
    dis.set(2, "90px")
    dis.set(3, "180px")
    var competidorDiv = document.createElement("div");
    competidorDiv.setAttribute("class", "nota1");
    competidorDiv.dataset.velocidad = Math.random() * 10;
    contenedor.appendChild(competidorDiv)
    var competidorImg = document.createElement("img");
    competidorImg.setAttribute("src", "images/cb.gif");
    competidorImg.setAttribute("width", "30px");
    competidorDiv.dataset.top = dis.get(getRandomInt(1, 3))
    competidorDiv.appendChild(competidorImg)
    // competidorDiv.innerHTML = i
}


setInterval(function () {
    crearCompetidor(1);
}, 1000)
*/
var contenedor = document.querySelector(".contenedor");


function crearNota(i) {
    var nuevaNota = document.createElement("div");
    nuevaNota.setAttribute("class", "nota nota-" + i);
    nuevaNota.dataset.velocidad = Math.random() * 10 + 1; // Asegurar que la velocidad no sea 0
    // Asignar un marginTop inicial para cada nota para evitar que se superpongan
    nuevaNota.style.marginTop = `-${i * 100}px`;
    nuevaNota.innerHTML = i;
    contenedor.appendChild(nuevaNota);
}
var alturaContenedor = document.querySelector('.contenedor').offsetHeight; // Obtiene la altura del contenedor

function moverNotas() {
    cont++;
    var notas = document.querySelectorAll(".nota");
    notas.forEach(function (nota) {
        var velocidadActual = parseFloat(nota.dataset.velocidad);
        var posicionActual = parseFloat(nota.style.marginTop.replace('px', ''));
        var nuevaPosicion = posicionActual + velocidadActual;

        if (nuevaPosicion < alturaContenedor) {
            nota.style.marginTop = `${nuevaPosicion}px`;
        } else {
            // nota.remove(); // Esto eliminará la nota del DOM cuando llegue al final
            // O puedes simplemente detenerla colocándola justo en el límite:
            nota.style.marginTop = `${alturaContenedor}px`;
        }
    });
}


function start() {
    // Limpiar el contenido previo para reiniciar el juego
    contenedor.innerHTML = '';
    pausado = false;
    // Crear notas iniciales
    for (i = 1; i <= 6; i++) {
        crearNota(i);
    }

    // Iniciar movimiento de las notas
    cont = 0;
    intervalo = setInterval(function () {
        cont++;
        var notas = document.querySelectorAll(".nota");
        notas.forEach(function (nota) {
            var velocidadActual = parseFloat(nota.dataset.velocidad);
            var posicionActual = parseFloat(nota.style.marginTop.replace('px', ''));
            nota.style.marginTop = `${posicionActual + velocidadActual}px`;
        });
    }, 10);
}

const pauseButton = document.querySelector('.play-pause');
let pausado = false;

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
