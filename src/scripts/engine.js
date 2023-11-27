const state = {
  view: {
    score: {
      player: document.getElementById("your-score"),
      enemy: document.getElementById("enemy-score"),
    },
    detail: {
      name: document.getElementById("card-name"),
      image: document.getElementById("card-image"),
      height: document.querySelector(".height"),
      weight: document.querySelector(".weight"),
      types: document.querySelector(".types"),
      hp: document.querySelector(".hp"),
      speed: document.querySelector(".spd"),
      attack: document.querySelector(".atk"),
      defense: document.querySelector(".def"),
    },
    fieldCards: {
      player: document.querySelector(".your-poke-card"),
      enemy: document.querySelector(".enemy-poke-card"),
    },
    cardAreas: {
      player: document.querySelector(".your-cards"),
      enemy: document.querySelector(".enemy-cards"),
    }
  },
  values: {
    playerPokemonList: null,
    enemyPokemonList: null,
    numberOfCards: 6,
  },
  action: {
    attributeSelector: document.querySelector(".confirm-attribute"),
    pokemonSelector: document.querySelector(".confirm-pokemon"),
  }
}
async function getPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}
function randomGenerator() {
  return(Math.floor(Math.random()*1017)+1);
}
function idCardsHandGenerator() {
  const idArray = [];
  for (let i = 1; i <= state.values.numberOfCards; i++) {
    idArray.push(randomGenerator())
  }
  return idArray
}
async function cardInHandGenerator() {
  const idArray = idCardsHandGenerator();
  
  const cardInHandList = [];

  for (let i = 0; i < idArray.length; i++) {
    const pokemonData = await(getPokemonData(idArray[i])) //Colocar idArray[i]
    const pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map(type => type.type.name),
      image: (pokemonData.sprites.other.dream_world.front_default)?pokemonData.sprites.other.dream_world.front_default:pokemonData.sprites.front_default,
      hp: pokemonData.stats.find((item) => item.stat.name === "hp").base_stat,
      speed: pokemonData.stats.find((item) => item.stat.name === "speed").base_stat,
      attack: pokemonData.stats.find((item) => item.stat.name === "attack").base_stat,
      defense: pokemonData.stats.find((item) => item.stat.name === "defense").base_stat,
    }
    cardInHandList.push(pokemon)
  }
  return cardInHandList
}

async function init() {
  state.values.enemyPokemonList = await cardInHandGenerator();

  for (let i=0; i<state.values.enemyPokemonList.length; i++) {
    const card = document.createElement("div");
    card.classList.add("your-card")

    const name = document.createElement("p");
    name.textContent = state.values.enemyPokemonList[i].name

    const image = document.createElement("img");
    image.src = state.values.enemyPokemonList[i].image;
    image.alt = state.values.enemyPokemonList[i].name;

    card.appendChild(name);
    card.appendChild(image);

    state.view.cardAreas.player.appendChild(card)
  }
  // state.action.pokemonSelector.addEventListener("click", e => {cardInHandGenerator(6)});
  // console.log(state)
}

init();