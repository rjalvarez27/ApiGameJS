const piedra = document.getElementById("piedra");
const tijera = document.getElementById("tijera");
const papel = document.getElementById("papel");
const text = document.getElementById("text");
const content = document.getElementById("result");
const user = document.getElementById("userImg");
const cpu = document.getElementById("machineImg");
const historial = document.getElementById("historial");
const puntuacion = document.getElementById("puntaje");


let victorias = [];
let puntaje = 0;


piedra.addEventListener("click", () => {
    play("piedra")
});
tijera.addEventListener("click", () => {
    play("tijera")
});
papel.addEventListener("click", () => {
    play("papel")
});


//Funcion historial 

function localStore() {
    if (victorias.length > 5) {
        victorias.shift()
    };
    localStorage.setItem('victorias', JSON.stringify(victorias));
    localStorage.setItem('puntaje', puntaje);

}

function cargarHistorial() {
    const localVictorias = localStorage.getItem('victorias');
    const localPuntaje = localStorage.getItem('puntaje');
    victorias = JSON.parse(localVictorias);
    puntaje = parseInt(localPuntaje);
    puntuacion.innerText = `${puntaje} puntos`;
    victorias.forEach((elemento) => {
        historial.innerHTML += `<li>${elemento}</li>`
    });
}

// Funcion Todo

function play(userOption) {
    const machineOption = machine()
    const num = result(userOption, machineOption)
    text.innerText = num
    user.src = "/Juego/Img/" + userOption + ".PNG";
    cpu.src = "/Juego/Img/" + machineOption + ".PNG";
    if (num === "Ganaste"){
        let mensaje = `Ganaste`;
        victorias.push(mensaje)
        puntaje += 1
        puntuacion.innerText = `${puntaje} puntos`
        localStore()
        mostrar()
    };
};

// Lista de Victorias 

function mostrar() {
    historial.innerHTML = ''
    victorias.forEach((elemento) => {
        historial.innerHTML += `<li>${elemento}</li>`
    })
}

// funcion Cpu 

function machine() {
    const machinArray = ["piedra", "papel", "tijera"]
    let random = Math.floor(Math.random() * machinArray.length);
    let machineOption = machinArray[random]
    return machineOption
}

// funcion Juego 

function result(userOption, machineOption) {
    if (userOption === machineOption) {
        return "Empate";
    } else if (userOption == "piedra") {
        if (machineOption == "papel") return "Perdiste";
        if (machineOption == "tijera") return "Ganaste";

    } else if (userOption == "papel") {
        if (machineOption == "piedra") return "Ganaste"
        if (machineOption == "tijera") return "Perdiste"

    } else if (userOption == "tijera") {
        if (machineOption == "papel") return "Ganaste"
        if (machineOption == "piedra") return "Perdiste"

    };
};

//funcion borrar historial 

function borrarHistorial() {
    victorias = [];
    historial.innerHTML = '';
    puntuacion.innerText = 0 ;
    localStorage.setItem('victorias', '')
    localStorage.setItem('puntaje', '0')
    puntaje = 0
}


mostrar()
cargarHistorial()