import { updateFieldDocument } from "../firebase.js";
import { state } from "../main.js";
import { createCard, getPokemonData } from "../pokemon.js";

const localState = {
  cardInMove: null,
  user: {
    cards: [1, 4, 8, 25, 12, 48, 63, 95, 105],
    hand: [1, 4, 8, 25, 12, 48],
  }
}

export function selectCard() {
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  } else {
    content = document.createElement("div");
    content.classList.add("content");
    content.classList.add("display-flex-col");
  };

  const contentSelectCardPage = document.createElement("div");
  contentSelectCardPage.classList.add("select-card");

  const cards = [...state.user.cards];
  // const cards = [...localState.user.cards];
  const hand = [...state.user.hand];
  // const hand = [...localState.user.hand];
  // Criar um input para buscar pelos pokemons usando o nome ou o id
  const searchArea = search();
  contentSelectCardPage.appendChild(searchArea);

  // Criar um carrossel com os cards dos pokemons que o jogador possui e não estão selecionados
  const cardArea = document.createElement("div");
  cardArea.classList.add("card-area");
  cardArea.addEventListener("dragover", (e) => e.preventDefault());
  cardArea.addEventListener("drop", async (e) => {
    const data = e.dataTransfer.getData("text/id");
    // const pokemon = await getPokemonData(data)
    const card = createCard(data);
    cardArea.appendChild(card);
  })
  cards.forEach(async (cardId) => await fillCardArea(hand, cardId, cardArea));  
  contentSelectCardPage.appendChild(cardArea);
  
  // Elaborar uma forma de auto completar o nome
  const selectedArea = document.createElement("div");
  selectedArea.classList.add("selected-area");
  selectedArea.addEventListener("dragover", (e) =>  e.preventDefault());
  selectedArea.addEventListener("drop", async (e) => {
    const data = e.dataTransfer.getData("text/id");
    const card = createCard(data);
    selectedArea.appendChild(card);
  })
  hand.forEach(async (cardId) => await fillSelectedArea(cardId, selectedArea));
  contentSelectCardPage.appendChild(selectedArea);

  // Elaborar um sistema drag and drop para as alterações
  const buttonArea = buttons();
  contentSelectCardPage.appendChild(buttonArea);

  content.appendChild(contentSelectCardPage);
  state.view.container.appendChild(content);
}

async function fillSelectedArea(cardId, selectedArea) {
  const pokemon = await getPokemonData(cardId);
  const item = await createCard(pokemon);
  item.classList.add("selected-item");
  item.addEventListener("dblclick", async () => {
    await removingCardSelected(pokemon, item);
  });
  selectedArea.appendChild(item);
}

async function fillCardArea(hand, cardId, cardArea) {
  const found = hand.some(obj => JSON.stringify(obj) === JSON.stringify(cardId));
  if (!found) {
    const pokemon = await getPokemonData(cardId);
    const item = await createCard(pokemon);
    item.addEventListener("dblclick", async () => {
      if (state.user.hand.length < 6) {
        await addingCardSelected(pokemon, item);
      }
    });
    cardArea.appendChild(item);
  }
}

async function addingCardSelected(pokemon, item) {
  state.user.hand.push(pokemon.id);
  const itemSelected = await createCard(pokemon);
  itemSelected.addEventListener("dblclick", async () => await removingCardSelected(pokemon, itemSelected));
  itemSelected.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/id", e.target.id);
  })
  const selectedArea = document.querySelector(".selected-area");
  selectedArea.appendChild(itemSelected);
  item.remove();
}

async function removingCardSelected(pokemon, itemSelected) {
  state.user.hand = state.user.hand.filter((card) => card !== pokemon.id);
  const unselectedItem = await createCard(pokemon);
  unselectedItem.addEventListener("dblclick", async () => await addingCardSelected(pokemon, unselectedItem));
  unselectedItem.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/id", e.target.id);
  })
  const cardArea = document.querySelector(".card-area");
  cardArea.appendChild(unselectedItem);
  itemSelected.remove();
}

function search() {
  const searchArea = document.createElement("div");

  searchArea.classList.add("search-area");

  const searchSpan = document.createElement("span");
  searchSpan.classList.add("search-span");
  searchSpan.textContent = "buscar";
  searchArea.appendChild(searchSpan);

  const magnifyingGlass = document.createElement("div");
  magnifyingGlass.classList.add("search-svg");
  magnifyingGlass.innerHTML = state.images.icons.magnifyingGlass;
  searchArea.appendChild(magnifyingGlass);

  const search = document.createElement("input");
  search.type = "text";
  search.addEventListener("onchange", () => {
    console.log("search")
    // Buscar dentro da lista palavras que começão com o valor armazenado na variável
    // Apresentar apenas a lista com os resultados do filtro
  })
  searchArea.appendChild(search);
  return searchArea;
}

function buttons() {
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button-area");

  const saveButton = document.createElement("button");
  saveButton.textContent = "salvar";
  saveButton.addEventListener("click", async () => await sendHandToDB());
  buttonArea.appendChild(saveButton);

  // Botão para limpar as alterações
  const hand = state.user.hand;
  const cleanButton = document.createElement("button");
  cleanButton.textContent = "restaurar";
  buttonArea.appendChild(cleanButton);
  return buttonArea;
}

async function sendHandToDB() {
  const selectedArea = document.querySelector(".selected-area");
  const cards = selectedArea.querySelectorAll(".card");
  const newHand = [];
  cards.forEach(card => {
    newHand.push(Number(card.id));
  });
  if (newHand.length === 6) {
    state.user.hand = newHand;
    await updateFieldDocument("Users", state.user.id, "hand", state.user.hand);
  }
}
