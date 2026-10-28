const mainCard = document.getElementById("mainCard");
const input = document.getElementById("input-user");
const imgPokemon = document.getElementById("img-pokemon");
const namePokemon = document.getElementById("name-pokemon");
const grid = document.getElementById("grid");

let isMainCreated = false;
let pokemonList = [];
let currentPokemon = [];

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    getPokemon();
  }
});

async function getPokemon() {
  const pokemonName = input.value;
  let exists = checkPokemon(pokemonName);
  if (exists) {
    updateMainCard(pokemonName)
    return;
  }

  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
    );

    const data = await response.json();
    console.log(data);
    savePokemon(data);
    createMainCard(data);
    updateMainCard(pokemonList[pokemonList.length -1]);
    show();
  } catch (error) {
    console.log(error);
  }
}

function savePokemon(data) {
  let newPokemon = {
    id: data.id,
    name: data.name,
    img_front: data.sprites.front_default,
    img_back: data.sprites.back_default,
  };

  pokemonList.push(newPokemon);
}

function checkPokemon(pokemonName) {
  for (pokemon of pokemonList) {
    if (pokemonName == pokemon.id || pokemonName == pokemon.name) {
      return true;
    }
  }
  console.log(false);
  return false;
}

function show() {
  createCard(pokemonList[pokemonList.length - 1]);
  console.log(pokemonList[pokemonList.length - 1]);
}

function createCard(pokemon) {
  // Cria o texto e a img
  const newText = document.createElement("p");
  const newImg = document.createElement("img");

  // define o valor do texto e do src da imagem
  newText.textContent = pokemon.name;
  newImg.src = pokemon.img_front;

  // cria a div e insere dentro da div
  const newDiv = document.createElement("div");
  newDiv.appendChild(newImg);
  newDiv.appendChild(newText);

  newDiv.classList.add("card-pokemon");
  grid.appendChild(newDiv);
}

function createMainCard(pokemon) {
  const mainImg = document.createElement("img");
  mainImg.id = "mainImg";
  mainImg.src = pokemon.img_front;
  mainCard.appendChild(mainImg);

  const mainTxt = document.createElement("p");
  mainTxt.id = "mainTxt";
  mainTxt.textContent = pokemon.name;
  mainCard.appendChild(mainTxt);


  isMainCreated = true;
}

function editMainCard(pokemon) {
    const mainTxt = document.getElementById("mainTxt");
    const mainImg = document.getElementById("mainImg");
    mainImg.src = pokemon.img_front;
    mainTxt.textContent = pokemon.name;
}

function updateMainCard(input){
if (isMainCreated == false) {
        createMainCard(input);
}

    let pokemon = getMemoryPokemon(input);
    editMainCard(pokemon);
  }

  //forma 2
    function getMemoryPokemon(input){
    for (let x = 0; x <= pokemonList.length - 1; x++){
        if (input == pokemonList[x].id || input == pokemonList[x].name) {
            currentPokemon = pokemonList
        }
    }

    return pokemonList[index];
  }

    //forma 1
  function getMemoryPokemon(input){
    let index = 0;

    for (let x = 0; x <= pokemonList.length - 1; x++){
        if (input == pokemonList[x].id || input == pokemonList[x].name) {
            index = x;
        }
    }

    return pokemonList[index];
  }