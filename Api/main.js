const favoritosV = document.getElementById("favoritosV");
const delet = document.getElementById("eliminar");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
let nextLink = "";
let prevLink = "";
let favoritos = [];

//max numero de card y carga
document.addEventListener("DOMContentLoaded", () => {
    getPokemons(`${apiUrl}`);
});

//funcion Local storage

function agregar(id) {
    favoritos = [... new Set(JSON.parse(localStorage.getItem("pokemon")))] || []
    let value = favoritos.includes(id)
    if (!value) {
     favoritos.push(id)
        if (favoritos.length > 5) {
            favoritos.shift()
        };
        localStorage.setItem("pokemon", JSON.stringify(favoritos));
        traerFavoritos(id)
    };
};

//cargar favoritos 

function cargarFavoritos() {
    const localFavorite = localStorage.getItem("pokemon");
    const content = JSON.parse(localFavorite)
    content.map((element) => {
        traerFavoritos(element)
    })
};

//Funcion traerFavoritos

function traerFavoritos(id) {
    try {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                datos;
                mostrarFavoritos(datos)
            });
    } catch (error) {
        console.log(error);
    };

}

//MostarFavoritos

function mostrarFavoritos(data) {
    const div = document.createElement("div");
    div.classList.add("card_fav")
    div.setAttribute("id", "br")
    favoritosV.appendChild(div)
    const img = document.createElement("img");
    img.src = data.sprites.other.home.front_default;
    img.classList.add("img_favoritos");
    const name = document.createElement("p");
    name.textContent = data.name;
    name.classList.add("name_fav");
    div.appendChild(name);
    div.appendChild(img);

}


// borrar Favoritos

function borrar() {
    favoritos = [];
    localStorage.clear();
    favoritosV.innerHTML = `<img src="/Api/Img/favoritos.png " alt="favoritos" class="fav">`
}

// traer la primera url Api

const getPokemons = async (api) => {
    try {
        const result = await fetch(api)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                datos;
                nextLink = datos.next;
                prevLink = datos.previous;
                inicio(datos.results); // callback
            });
    } catch (error) {
        console.log(error);
    }
};

//traer datos de la segunda url Api

const inicio = async (array) => {
    try {
        const event = await array;
        event.map((item) => {
            fetch(item.url)
                .then((respuesta) => respuesta.json())
                .then((data) => {
                    card(data);
                });
        });
    } catch (error) {
        console.log(error);
    }
};

// Todo el contenido de carta del Pokemon

const card = async (data) => {
    // Cara Principal
    const container = document.getElementById("container");
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    const car = document.createElement("div");
    car.classList.add("car");
    const id = document.createElement("p");
    id.textContent = data.id;
    id.classList.add("id");
    const name = document.createElement("p");
    name.textContent = data.name;
    name.classList.add("name");
    const img = document.createElement("img");
    img.src = data.sprites.other.home.front_default;
    img.classList.add("img");
    container.appendChild(flipCard);
    flipCard.appendChild(cardContainer);
    cardContainer.appendChild(car);
    car.appendChild(img);
    car.appendChild(name);
    car.appendChild(id);
    // Cara Secundaria
    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.textContent = "Habilidades";
    cardContainer.appendChild(cardBack);
    const divBack = document.createElement("div");
    divBack.classList.add("div_back");
    cardBack.appendChild(divBack);
    const peso = document.createElement("p");
    peso.textContent = `Peso: ${data.weight} kg`;
    const fuerza = document.createElement("p");
    fuerza.textContent = `Fuerza: ${data.stats[0].base_stat}  ${data.stats[0].stat.name}`;
    const ataque = document.createElement("p");
    ataque.textContent = `Ataque: ${data.stats[1].base_stat}`;
    const defensa = document.createElement("p");
    defensa.textContent = `Defensa: ${data.stats[2].base_stat}`;
    divBack.appendChild(peso);
    divBack.appendChild(fuerza);
    divBack.appendChild(ataque);
    divBack.appendChild(defensa);
    //Boton de favoritos
    const fav = document.createElement("button");
    fav.classList.add("favoritos");
    fav.textContent = "Like";
    fav.setAttribute("id", "favorito");
    fav.setAttribute("onclick", `agregar(${data.id})`);
    flipCard.appendChild(fav);
};

//Funcion para borrar hijos de un DIV
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

// Boton de atras
const prev = () => {
    removeChildNodes(container);
    getPokemons(prevLink == null ? nextLink : prevLink);
};

//boton de siguiente

const next = () => {
    removeChildNodes(container);
    getPokemons(nextLink);
};


cargarFavoritos()
