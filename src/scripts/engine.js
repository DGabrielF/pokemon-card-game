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
    },
    turn: {
      player: document.querySelector(".your-turn"),
      enemy: document.querySelector(".enemy-turn"),
    },
    attribute: {
      selected: document.getElementsByName("option"),
    }
  },
  values: {
    numberOfCards: 2,
    roundsPlayed: 0,
    playerScore: 0,
    playerPokemonList: null,
    playerPokemonInField: null,
    enemyScore: 0,
    enemyPokemonList: null,
    enemyPokemonInField: null,
    playingOrder: null,
    attributes: ["height", "weight", "hp", "speed", "attack", "defense"],
    attributeSelected: null,
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
    const pokemonData = await(getPokemonData(idArray[i]))
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
function createCards(pokelist, cardArea, cardClass) {
  for (let i = 0; i < pokelist.length; i++) {
    const card = document.createElement("div");
    card.key = pokelist[i].name;
    card.classList.add(cardClass);

    const name = document.createElement("p");
    name.textContent = pokelist[i].name;

    const image = document.createElement("img");
    image.src = pokelist[i].image;
    image.alt = pokelist[i].name;

    pokelist[i].types.forEach((type) => {
      card.classList.add(type);
    });
    if (cardArea === state.view.cardAreas.player) {
      card.onclick = e => handleDetails(pokelist[i]);
    }

    card.appendChild(name);
    card.appendChild(image);
    cardArea.appendChild(card);
  }
}
function handleDetails(card) {
  state.view.detail.name.textContent = card.name;
  state.view.detail.height.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M167.39,196.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,96,192h24V64H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,64H136V192h24A8,8,0,0,1,167.39,196.94Z"></path></svg> ${card.height}`;
  state.view.detail.weight.innerHTML = `<svg style="width: 1rem; height:1rem" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M244,116V88a20,20,0,0,0-20-20H208V64a20,20,0,0,0-20-20H164a20,20,0,0,0-20,20v52H112V64A20,20,0,0,0,92,44H68A20,20,0,0,0,48,64v4H32A20,20,0,0,0,12,88v28a12,12,0,0,0,0,24v28a20,20,0,0,0,20,20H48v4a20,20,0,0,0,20,20H92a20,20,0,0,0,20-20V140h32v52a20,20,0,0,0,20,20h24a20,20,0,0,0,20-20v-4h16a20,20,0,0,0,20-20V140a12,12,0,0,0,0-24ZM36,164V92H48v72Zm52,24H72V68H88Zm96,0H168V68h16Zm36-24H208V92h12Z" opacity="0.8"></path></svg> ${card.weight}`;
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
  state.action.pokemonSelector.disabled = true;
  state.view.fieldCard.player.innerHTML = "";
  const cards = Array.from(document.querySelectorAll(`.your-card`));
  const card = cards.find(card => card.key === state.view.detail.name.textContent);
  console.log(card)
  state.values.playerPokemonInField = state.values.playerPokemonList.find(poke => poke.name === state.view.detail.name.textContent);
  state.view.fieldCard.player.innerHTML = card.innerHTML;
  state.view.fieldCard.player.classList = card.classList;

  checkComparisonRquirements()
}
function enemyPokeInField() {
  state.view.fieldCard.enemy.innerHTML = "";
  const cards = Array.from(document.querySelectorAll(`.enemy-card`));
  const randeomId = Math.floor(Math.random()*cards.length);
  const card = cards[randeomId];
  console.log(card.classList)

  state.view.fieldCard.enemy.innerHTML = card.innerHTML;
  state.view.fieldCard.enemy.classList = card.classList;
  state.view.fieldCard.enemy.classList.remove ("enemy-card");
  state.view.fieldCard.enemy.classList.add ("your-card");

  state.values.enemyPokemonInField = state.values.enemyPokemonList[randeomId]
}
function whoStarts() {
  // state.values.playingOrder = (Math.random()>.5)?["player", "enemy"]:["enemy", "player"];
  state.values.playingOrder = (1>.5)?["player", "enemy"]:["enemy", "player"];
  // console.log("playingOrder", state.values.playingOrder)
}
function handleTurn() {
  state.view.turn[state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length]].style.visibility = "visible";
  state.view.turn[state.values.playingOrder[(state.values.roundsPlayed +1) % state.values.playingOrder.length]].style.visibility = "hidden";
  
  if (state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length] === "enemy") {
    state.action.attributeSelector.disabled = true;
    enemyPokeInField();
    state.values.attributeSelected = state.values.attributes[Math.floor(Math.random()*state.values.attributes.length)];
  } else if (state.values.playingOrder[state.values.roundsPlayed % state.values.playingOrder.length] === "player") {
    const optionUnchecked = document.querySelectorAll('input[type="radio"]');
    optionUnchecked.forEach(option => option.disabled = false);
    state.action.attributeSelector.disabled = false;
  }
}
function cleanRound() {
  state.values.roundsPlayed++;
  state.values.attributeSelected=null;
  state.values.playerPokemonInField=null;
  state.values.enemyPokemonInField=null;
  const playerFieldToClean =document.querySelector(".duel-box :nth-child(2)")
  playerFieldToClean.classList = "your-poke-card"
  playerFieldToClean.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
    <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0M6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66m1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8M.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752m-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
  </svg>`
  const enemyFieldToClean =document.querySelector(".duel-box :nth-child(4)")
  enemyFieldToClean.classList = "enemy-poke-card"
  enemyFieldToClean.innerHTML = ""
  state.action.pokemonSelector.disabled = false;
  state.view.detail.height
  state.view.detail.weight
  state.view.detail.hp
  state.view.detail.speed
  state.view.detail.attack
  state.view.detail.defense
}
function handleAttribute() {
  const option = document.querySelector("input:checked");
  const optionUnchecked = document.querySelectorAll('input[type="radio"]');

  optionUnchecked.forEach(option => option.disabled = true);

  state.values.attributeSelected = option.value;

  state.action.attributeSelector.disabled = true;

  checkComparisonRquirements()
}
function endGame() {
  if (state.values.playerScore>=state.values.numberOfCards) {
    console.log("Parabéns, você venceu!")
    return true
  } else if (state.values.enemyScore>=state.values.numberOfCards) {
    console.log("Que pena, você perdeu...")
    return true
  } else {
    return false
  }
}
function comparison() {
  console.log("player:", state.values.playerPokemonInField)
  console.log("enemy:", state.values.enemyPokemonInField)
  let isEndGame;
  if (state.values.playerPokemonInField[state.values.attributeSelected] > state.values.enemyPokemonInField[state.values.attributeSelected]) {
    state.values.playerScore++;
    isEndGame = endGame();
    
    state.view.score.player.textContent = state.values.playerScore;
    const cards = Array.from(document.querySelectorAll(".enemy-cards .enemy-card"));
    const card = cards.find(card => card.key === state.values.enemyPokemonInField.name);
    if (card){
      card.innerHTML = ""
      card.classList = ["defeated-card"];
      card.onclick = null;
    }
  } else if (state.values.playerPokemonInField[state.values.attributeSelected] < state.values.enemyPokemonInField[state.values.attributeSelected]) {
    state.values.enemyScore++;
    isEndGame = endGame();
    
    state.view.score.enemy.textContent = state.values.enemyScore;    
    const cards = Array.from(document.querySelectorAll(".your-cards .your-card"));
    const card = cards.find(card => card.key === state.values.playerPokemonInField.name);
    if (card){
      card.innerHTML = ""
      card.classList = ["defeated-card"];
      card.onclick = null;
    }
  }
  console.log(isEndGame)
  if (!isEndGame) {
    setTimeout(() => {cleanRound(); handleTurn()}, 1500);
  }
}
function checkComparisonRquirements() {
  if (state.view.fieldCard.player.classList.contains("your-poke-card")) return false
  if ((state.values.attributeSelected === null)) return false
  if (state.view.fieldCard.enemy.classList.contains("enemy-poke-card")) {
    enemyPokeInField()
  }
  comparison()
}
async function init() {
  state.values.enemyPokemonList = await cardInHandGenerator();
  createCards(state.values.enemyPokemonList, state.view.cardAreas.enemy, "enemy-card");
  state.values.playerPokemonList = await cardInHandGenerator();
  createCards(state.values.playerPokemonList, state.view.cardAreas.player, "your-card");

  handleDetails(state.values.playerPokemonList[0]);

  state.action.attributeSelector.addEventListener("click", () => handleAttribute());
  state.action.pokemonSelector.addEventListener("click", () => handleInField());
  whoStarts();
  handleTurn();

}

init();