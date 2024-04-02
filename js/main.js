var content = document.querySelector(".content")

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = getRandomInt(1, 3);
function crearCompetidor(i){
    const dis = new Map();
    dis.set(1, "40px")
    dis.set(2, "90px")
    dis.set(3, "180px")
    var competidorDiv = document.createElement("div");
    competidorDiv.setAttribute("class", "circulo1");
    competidorDiv.dataset.velocidad = Math.random() * 10;
    content.appendChild(competidorDiv)
    var competidorImg = document.createElement("img");
    competidorImg.setAttribute("src", "images/cb.gif");
    competidorImg.setAttribute("width", "30px");
    competidorDiv.dataset.top = dis.get(getRandomInt(1, 3))
    competidorDiv.appendChild(competidorImg)
    // competidorDiv.innerHTML = i
}


setInterval(function(){
 crearCompetidor(1);
}, 1000)

intervalo = "";
function start(){


    cont = 0;
intervalo = setInterval(function (){

    cont = cont + 1;
    var elementos = document.querySelectorAll(".circulo1");
    elementos.forEach(function (elemento){
        elemento.style.marginLeft = (cont * elemento.dataset.velocidad)+"px"
        elemento.style.marginTop = elemento.dataset.top
    })

}, 100);

}

document.addEventListener("keyup", function (evt){

    console.log(evt.key)
    if(evt.key === "a"){
        start()
    }
    if(evt.key === "s"){
        clearInterval(intervalo)
    }
})