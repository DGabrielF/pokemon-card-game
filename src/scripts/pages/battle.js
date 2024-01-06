import { state } from "../main.js";
import { createCard, getPokemonData } from "../pokemon.js";

const localState = {
  values: {
    attributeSelected: "height",
    playingOrder: null,
    winner: null,
    round: -1,
  },
  player: {
    name: null,
    inField: null,
    score: 0,
    hand: [],
  },
  enemy: {
    name: null,
    inField: null,
    score: 0,
    hand: [],
  },
}

export function battle( player, enemy ) {
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  } else {
    content = document.createElement("div");
    content.classList.add("content");
    content.classList.add("display-flex-col");
  };
  localState.player.hand = [...player.hand];
  localState.player.name = player.name;
  localState.enemy.hand = [...enemy.hand];
  localState.enemy.name = enemy.name;
  
  const contentDuelPage = document.createElement("div");
  contentDuelPage.classList.add("duel-page");
  
  const enemyArea = createEnemyArea(enemy);
  contentDuelPage.appendChild(enemyArea);

  const enemyInfo = document.createElement("div");
  enemyInfo.classList.add("enemy-info");
  const enemyScore = document.createElement("span");
  enemyScore.id = "enemy-score";
  enemyScore.textContent = localState.enemy.score;
  enemyInfo.appendChild(enemyScore);
  const enemyName = document.createElement("span");
  enemyName.id = "enemy-name";
  enemyName.textContent = localState.enemy.name;
  enemyInfo.appendChild(enemyName);
  contentDuelPage.appendChild(enemyInfo);
  
  const duelArea = createDuelArea();
  contentDuelPage.appendChild(duelArea);
  
  const attributeArea = createAttributeArea();
  contentDuelPage.appendChild(attributeArea);
  
  const playerArea = createPlayerArea(player);
  contentDuelPage.appendChild(playerArea);
  
  content.appendChild(contentDuelPage);
  state.view.container.appendChild(content);

  handleStart();
  handleRound();
}

function createPlayerArea() {
  const playerArea = document.createElement("div");
  playerArea.classList.add("your-cards");
  localState.player.hand.forEach(async (pokemon) => await fillCards(pokemon, playerArea));
  return playerArea;
}

function createEnemyArea(enemy) {
  const enemyArea = document.createElement("div");
  enemyArea.classList.add("enemy-cards");
  enemy.hand.forEach(() => fillTurnedCards(enemyArea));
  return enemyArea;
}

function createDuelArea() {
  const duelArea = document.createElement("div");
  duelArea.classList.add("duel-box");

  const playerInField = cardDetails("player-card-detail");
  duelArea.appendChild(playerInField);

  const interactiveArea = document.createElement("div");
  interactiveArea.classList.add("interactive-area");

  const roundArea = createRoundArea();
  interactiveArea.appendChild(roundArea)

  const attributeSelected = document.createElement("div");
  attributeSelected.classList.add("attribute-selected");
  interactiveArea.appendChild(attributeSelected)

  const confirm = document.createElement("button");
  confirm.textContent = "vai";
  confirm.addEventListener("click", async () => {
    upDateDetails(localState.enemy.inField, "enemy-card-detail")
    const playerAttribute = await getPokemonAttribute(localState.player.inField, localState.values.attributeSelected);
    const enemyAttribute = await getPokemonAttribute(localState.enemy.inField, localState.values.attributeSelected);
    comparison(playerAttribute, enemyAttribute)
  })
  interactiveArea.appendChild(confirm)

  duelArea.appendChild(interactiveArea);

  const enemyInField = cardDetails("enemy-card-detail");
  duelArea.appendChild(enemyInField);
  return duelArea;
}

function createRoundArea() {
  const roundArea = document.createElement("div");
  roundArea.classList.add("round-area");
  const roundSpan = document.createElement("span");
  roundSpan.textContent = "turno";
  roundArea.appendChild(roundSpan);
  const round = document.createElement("span");
  round.id = "round";
  roundArea.appendChild(round);
  round.textContent = 0;
  return roundArea;
}

function createAttributeArea() {
  const attributeArea = document.createElement("div");
  attributeArea.classList.add("attribute-area")

  const playerInfo = document.createElement("div");
  playerInfo.classList.add("player-info");
  const playerName = document.createElement("span");
  playerName.id = "player-name";
  playerName.textContent = localState.player.name;
  playerInfo.appendChild(playerName);
  const playerScore = document.createElement("span");
  playerScore.id = "player-score";
  playerScore.textContent = localState.player.score;
  playerInfo.appendChild(playerScore);
  attributeArea.appendChild(playerInfo)

  const options = document.createElement("div");
  options.classList.add("select-attribute-area");

  for (const key in state.attributes ) {
    const div = document.createElement("div");
    div.id = key;
    if (key === localState.values.attributeSelected) {
      div.classList.add("checked");
    };
    div.innerHTML = state.attributes[key].image;
    options.appendChild(div);
  }
  attributeArea.appendChild(options);
  return attributeArea;
}

function handleAttribute(div, key) {
  const checked = document.querySelector(".checked");
  checked.classList.remove("checked");
  div.classList.add("checked");
  localState.values.attributeSelected = key;
  updateAttributeSelectedArea();
}

function updateAttributeSelectedArea() {
  const attributeSelected = document.querySelector(".attribute-selected");
  if (localState.values.attributeSelected) {
    attributeSelected.innerHTML = state.attributes[localState.values.attributeSelected].image;
  } else {
    attributeSelected.innerHTML = state.images.source.interrogation;
  }
}

function cardDetails(classToAdd) {
  const playerInField = document.createElement("div");
  playerInField.classList.add(classToAdd);
  const cardName = document.createElement("span");
  cardName.classList.add("card-name");
  cardName.textContent = "nome";
  playerInField.appendChild(cardName);
  const detailHeader = document.createElement("div");
  detailHeader.classList.add("card-detail-header");

  const physicalAttributes = document.createElement("div");
  physicalAttributes.classList.add("physical-attributes");

  const height = document.createElement("div");
  height.innerHTML = state.attributes.height.image;
  const heightSpan = document.createElement("span");
  heightSpan.textContent = "altura"
  heightSpan.classList.add("height");
  height.appendChild(heightSpan);
  physicalAttributes.appendChild(height);

  const weight = document.createElement("div");
  weight.innerHTML = state.attributes.weight.image;
  const weightSpan = document.createElement("span");
  weightSpan.textContent = "peso"
  weightSpan.classList.add("weight");
  weight.appendChild(weightSpan);
  physicalAttributes.appendChild(weight);
  detailHeader.appendChild(physicalAttributes);

  const types = document.createElement("div");
  types.classList.add("types");
  detailHeader.appendChild(types);

  playerInField.appendChild(detailHeader);

  const img = document.createElement("img");
  img.src = state.images.source.pokeball;
  img.classList.add("card-image");
  playerInField.appendChild(img);

  const detailFooterArea = document.createElement("div");
  detailFooterArea.classList.add("card-detail-footer");



  for (const key in state.attributes ) {
    const div = document.createElement("div");
    div.innerHTML = state.attributes[key].image;

    if (!["height", "weight"].includes(key)) {
      const span = document.createElement("span");
      span.classList.add(state.attributes[key].id)
      span.textContent = state.attributes[key].name;
      div.appendChild(span);
  
      detailFooterArea.appendChild(div);
    }

    
  };

  playerInField.appendChild(detailFooterArea);
  return playerInField;
}

function fillTurnedCards(enemyArea) {
  const turnedCard = document.createElement("div");
  turnedCard.classList.add("card");
  turnedCard.classList.add("turned");
  enemyArea.appendChild(turnedCard);
}

async function fillCards(pokemon, playerArea) {
  const card = await createCard(pokemon);
  card.addEventListener("click", async () => {
    const pokemon = await getPokemonData(card.id);
    localState.player.inField = pokemon;
    upDateDetails(pokemon, "player-card-detail");
  })
  playerArea.appendChild(card);
}

function handleStart() {
  localState.values.playingOrder = (Math.random()>.5)?["player", "enemy"]:["enemy", "player"];
}

function upDateDetails(pokemon, classToFind) {
  const div = document.querySelector(`.${classToFind}`);

  const classes = Array.from(div.classList);
  classes.forEach((className) => {
    if (!className.endsWith("card-detail")) {
      element.classList.remove(className);
    }
  })

  const cardName = div.querySelector(".card-name");
  cardName.textContent = pokemon.name || "nome";

  const cardImage = div.querySelector(".card-image");
  cardImage.src = (pokemon.sprites.other.dream_world.front_default)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_default || state.images.source.pokeball;
  for (const key in state.attributes) {
    const attributeElement = div.querySelector(`.${state.attributes[key].id}`);
    let founded = pokemon.stats.find(item => item.stat.name === key);
    if (founded) {
      attributeElement.textContent = founded.base_stat || state.attributes[key].id;
    } else {
      attributeElement.textContent = pokemon[key] || state.attributes[key].id;
    }
  }
}

function cleanDetails(classToFind) {
  const div = document.querySelector(`.${classToFind}`);

  const classes = Array.from(div.classList);
  classes.forEach((className) => {
    if (!className.endsWith("card-detail")) {
      element.classList.remove(className);
    }
  })

  const cardName = div.querySelector(".card-name");
  cardName.textContent = "nome";

  const cardImage = div.querySelector(".card-image");
  cardImage.src = state.images.source.pokeball;
  for (const key in state.attributes) {
    const attributeElement = div.querySelector(`.${state.attributes[key].id}`);
    attributeElement.textContent = state.attributes[key].name;
  }
}

function getPokemonAttribute(pokemon, attribute) {
  if (attribute in pokemon) {
    return pokemon[attribute]
  } else {
    const founded = pokemon.stats.find(item => item.stat.name === attribute)
    return founded.base_stat;
  }
}

async function enemyCardSelector() {
  const handId = Math.floor(Math.random() * localState.enemy.hand.length);
  const pokemon = await getPokemonData(localState.enemy.hand[handId]);
  localState.enemy.inField = pokemon;
}

function enemyAttributeSelector() {
  const attributeKeys = Object.keys(state.attributes);
  const attributeId = Math.floor(Math.random() * attributeKeys.length);
  const attributeSelected = attributeKeys[attributeId];
  localState.values.attributeSelected = attributeSelected;
  updateAttributeSelectedArea()
}

function comparison(playerAttribute, enemyAttribute) {
  const round = document.querySelector("#round");
  round.textContent = localState.values.round;
  
  const winner = (playerAttribute > enemyAttribute)?"player":"enemy";
  localState[winner].score += 1;
  const score = document.querySelector(`#${winner}-score`);
  score.textContent = localState[winner].score;
  if (localState[winner].score === 6) {
    localState.values.winner = localState[winner].name;
    endGame();
  } else {
    localState.values.attributeSelected = null;
    localState.player.inField = null;
    localState.enemy.inField = null;
    setTimeout(() => cleanDetails("player-card-detail"), 3000);
    setTimeout(() => cleanDetails("enemy-card-detail"), 3000);
    setTimeout(() => updateAttributeSelectedArea(), 3000);
    setTimeout(() => handleRound(), 3000);
  }
}

function endGame() {
  console.log(localState.values.winner)
  if (localState.values.winner === localState.player.name) {
    console.log("você foi o vencedor, parabéns!")
    console.log(`de acordo com o resultado você obeteve ${11+2*localState.player.score-1*localState.enemy.score}`)
  } else {
    console.log("infelizmente você foi derrotado")
    console.log(`mas você ainda obeteve ${11+2*localState.player.score-1*localState.enemy.score}`)
  }
}

async function handleRound() {
  localState.values.round += 1;
  const roundOwnerId = localState.values.round % localState.values.playingOrder.length;
  const roundOwner = localState.values.playingOrder[roundOwnerId];
  await enemyCardSelector();
  
  if (roundOwner === "enemy") {
    enemyAttributeSelector();
  }
  toggleAttribute(roundOwner === "player");
}

function toggleAttribute(enable) {
  const attributeArea = document.querySelector(".select-attribute-area");
  const buttons = Array.from(attributeArea.children);
  buttons.forEach((button) => {
    if (enable) {
      button.classList.remove("unabled");
      button.addEventListener("click", () => handleAttribute(button, button.id));
    } else {
      button.classList.add("unabled");
      button.removeEventListener("click", () => handleAttribute(button, button.id));
    }
  })
}