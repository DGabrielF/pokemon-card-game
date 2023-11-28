const state = {
  view: {
    score: {
      player: document.getElementById("your-score"),
      enemy: document.getElementById("enemy-score"),
    },
    detail: {
      card: document.querySelector(".card-detail"),
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
    fieldCard: {
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
  // const idArray = idCardsHandGenerator();
  const idArray = [1,4,7,12,11,100];
  
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
function handleDetails(card) {
  state.view.detail.name.textContent = card.name;
  state.view.detail.height.textContent = `A:${card.height}`;
  state.view.detail.weight.textContent = `P:${card.weight}`;
  state.view.detail.types.innerHTML = "";
  state.view.detail.card.classList = ["card-detail"],
  card.types.forEach((type) => {
    state.view.detail.card.classList.add(type)
    const typeDiv = document.createElement('div');
    typeDiv.classList.add('type');
    typeDiv.textContent = type;
    state.view.detail.types.appendChild(typeDiv);
  });
  state.view.detail.hp.textContent = card.hp;
  state.view.detail.speed.textContent = card.speed;
  state.view.detail.attack.textContent = card.attack;
  state.view.detail.defense.textContent = card.defense;
  state.view.detail.image.src = card.image;
  state.view.detail.image.alt = card.name;
}
function handleInField() {
  state.view.fieldCard.player.innerHTML = "";

  const name = document.createElement("p");
  name.textContent = state.view.detail.name.textContent;  
  state.view.fieldCard.player.appendChild(name)
  console.log(state.view.detail)
  
  const image = document.createElement("img");
  image.src = state.view.detail.image.src;
  image.alt = state.view.detail.name.textContent;
  state.view.fieldCard.player.appendChild(image)

  // filtrar a lista de card na mão para encontrar o que possui o mesmo nome do detail e colar no infiel
  // limpar o infield no final de cada rodada
}
async function init() {
  state.values.enemyPokemonList = await cardInHandGenerator();

  for (let i=0; i<state.values.enemyPokemonList.length; i++) {
    const card = document.createElement("div");
    card.name = state.values.enemyPokemonList[i].name;
    card.classList.add("your-card");

    const name = document.createElement("p");
    name.textContent = state.values.enemyPokemonList[i].name;

    const image = document.createElement("img");
    image.src = state.values.enemyPokemonList[i].image;
    image.alt = state.values.enemyPokemonList[i].name;

    state.values.enemyPokemonList[i].types.forEach((type) => {
      card.classList.add(type);
    })
    card.onclick = e => handleDetails(state.values.enemyPokemonList[i]);
  
    card.appendChild(name);
    card.appendChild(image);

    state.view.cardAreas.player.appendChild(card);
  }
  state.action.pokemonSelector.addEventListener("click",e => handleInField());
  // state.action.pokemonSelector.addEventListener("click", e => {cardInHandGenerator(6)});
  // console.log(state)
}

init();