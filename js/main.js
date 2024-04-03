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
    content.appendChild(competidorDiv)
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
var content = document.querySelector(".content");

function crearNota() {
    var nuevaNota = document.createElement("div");
    nuevaNota.setAttribute("class", "nota");
    content.appendChild(nuevaNota);
}
for (i = 1; i <= 6; i++) {
    crearNota();
}
var cont = 0;
var intervalo = setInterval(function () {
    cont = cont + 1;
    var elementos = document.querySelectorAll(".nota");
    elementos.forEach(function (elemento) {
        elemento.style.marginLeft = (cont) + "px";
    })
}, 10);

// intervalo = "";

function start() {
    cont = 0;

}

function pause() {

}

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
        pause();
    }
})