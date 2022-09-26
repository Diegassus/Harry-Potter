let cards = [];
let characters=[];
let table 

const mostrarCartas = (card,table) => {
     card.sort((a, b) => Math.random() - 0.5);
     table.innerHTML+=card;
  };

function crearCarta(characters){
    table = document.getElementById("table");
    table.innerHTML="";
    let cartas = [];
    let i =0;
    characters.forEach(character => {
        cartas.push(`<div class="carde"onclick="selecCard(${i})">
        <div class="card" id="card${i}" >
            <div class="back c" id="back${i}">
                <img src="${character.image}" alt="algo" >
            </div>
            <div class="front c">
                <img src="https://i.pinimg.com/originals/0a/41/0e/0a410e3a4f03610eed0dbbbcd2f0a3db.png" alt="Hogwarts" class="logo">
            </div>
        </div>
    </div>`);
    i++;
    });
    characters.forEach(character => {
        cartas.push(`<div class="carde"onclick="selecCard(${i})">
        <div class="card" id="card${i}" >
            <div class="back c" id="back${i}">
                <img src="${character.image}" alt="algo" >
            </div>
            <div class="front c">
                <img src="https://i.pinimg.com/originals/0a/41/0e/0a410e3a4f03610eed0dbbbcd2f0a3db.png" alt="Hogwarts" class="logo">
            </div>
        </div>
    </div>`);
    i++;
    });
    cards.push(mostrarCartas(cartas,table));
}

function cargarCartas(){
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", async () => {
      let response;
      if (xhr.status == 200 || xhr.status == 201) response = xhr.response;
      else response = "ocurrio un error";
      personajes = await JSON.parse(response);
      for (let i = 0; i < 10; i++) {
        characters.push(personajes[i]);
      }
      crearCarta(characters); //llena un array con los personajes seleccionados
    });
  
    xhr.open("GET", "http://hp-api.herokuapp.com/api/characters");
  
    xhr.send();
}
let activo=false;
let id;

function cargarTablero(){
    cards = [];
    characters=[];
    selected=[];
    ite=0;
    ganadas=[]
    cargarCartas();
    s=0;m=0;h=0;
    if(!activo){
        
    cronometrar()
    activo=true
    }else{
        clearInterval(id);
        parar();
        activo=false
        cronometrar()
    }
    
    
}
function cronometrar(){
    clearInterval(id);
    cargarTiempo();
    id = setInterval(cargarTiempo,1000);
    document.querySelector(".newGame").removeEventListener("click",cronometrar);
}

function parar(){
    clearInterval(id);
    document.getElementById("tiempo").innerHTML="00:00:00";
    h=0;m=0;s=0;
    document.querySelector(".newGame").addEventListener("click",cronometrar);
}

let selected=[]

function selecCard(i){
    let card = document.getElementById('card'+i);
    if(card.style.transform != 'rotateY(180deg)'){
        card.style.transform = 'rotateY(180deg)'
        selected.push(i)
    }
    if(selected.length==2){
        deselected(selected)
        selected=[];
    }
}

let ganadas=[];

function deselected(selected){
    setTimeout(()=>{
        let back1 = document.getElementById("back"+selected[0]);
        let back2 = document.getElementById("back"+selected[1]);
        if(back1.innerHTML!=back2.innerHTML){
            let card1 = document.getElementById('card'+selected[0]);
            let card2 = document.getElementById('card'+selected[1]);
            card1.style.transform="rotateY(0deg)";
            card2.style.transform="rotateY(0deg)";
        }else{
            ganadas.push(card1);
            ganadas.push(card2);
            if(ganadas.length===20){
                alert(`Felicidades, ganaste con ${ite-1} intentos realizados y en ${document.getElementById("tiempo").innerHTML}!!!!` );
                let tiempo =document.getElementById("tiempo").innerHTML
                parar()
                document.getElementById("tiempo").innerHTML=tiempo;
            }
        }
    },400)
}
let ite=0;

function contarIntentos(){
    const intento = document.getElementById('intento');
    intento.innerHTML=ite;
    ite++;
}

let s=0,m=0,h=0;

function cargarTiempo(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("tiempo").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}
