import { addDataOnArrayField, updateFieldDocument } from "../firebase.js";
import { state } from "../main.js";
import { createCard, drawCard } from "../pokemon.js";

const localState = {
  images: {
    hCoin: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,104c0,24-40,48-104,48S24,128,24,104,64,56,128,56,232,80,232,104Z" opacity="0.2"></path><path d="M207.58,63.84C186.85,53.48,159.33,48,128,48S69.15,53.48,48.42,63.84,16,88.78,16,104v48c0,15.22,11.82,29.85,32.42,40.16S96.67,208,128,208s58.85-5.48,79.58-15.84S240,167.22,240,152V104C240,88.78,228.18,74.15,207.58,63.84ZM128,64c62.64,0,96,23.23,96,40s-33.36,40-96,40-96-23.23-96-40S65.36,64,128,64Zm-8,95.86v32c-19-.62-35-3.42-48-7.49V153.05A203.43,203.43,0,0,0,120,159.86Zm16,0a203.43,203.43,0,0,0,48-6.81v31.31c-13,4.07-29,6.87-48,7.49ZM32,152V133.53a82.88,82.88,0,0,0,16.42,10.63c2.43,1.21,5,2.35,7.58,3.43V178C40.17,170.16,32,160.29,32,152Zm168,26V147.59c2.61-1.08,5.15-2.22,7.58-3.43A82.88,82.88,0,0,0,224,133.53V152C224,160.29,215.83,170.16,200,178Z"></path></svg>`,
    vCoin: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M160,128c0,53-25.07,96-56,96s-56-43-56-96,25.07-96,56-96S160,75,160,128Z" opacity="0.2"></path><path d="M198.51,56.09C186.44,35.4,169.92,24,152,24H104C86.08,24,69.56,35.4,57.49,56.09,46.21,75.42,40,101,40,128s6.21,52.58,17.49,71.91C69.56,220.6,86.08,232,104,232h48c17.92,0,34.44-11.4,46.51-32.09C209.79,180.58,216,155,216,128S209.79,75.42,198.51,56.09ZM199.79,120h-32a152.78,152.78,0,0,0-9.68-48H188.7C194.82,85.38,198.86,102,199.79,120Zm-20.6-64H150.46a83.13,83.13,0,0,0-12-16H152C162,40,171.4,46,179.19,56ZM56,128c0-47.7,22-88,48-88s48,40.3,48,88-22,88-48,88S56,175.7,56,128Zm96,88H138.49a83.13,83.13,0,0,0,12-16h28.73C171.4,210,162,216,152,216Zm36.7-32H158.12a152.78,152.78,0,0,0,9.68-48h32C198.86,154,194.82,170.62,188.7,184Z"></path></svg>`,
    dualCoin: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,132c0,19.88-35.82,36-80,36-19.6,0-37.56-3.17-51.47-8.44h0C146.76,156.85,176,142,176,124V96.72h0C212.52,100.06,240,114.58,240,132ZM176,84c0-19.88-35.82-36-80-36S16,64.12,16,84s35.82,36,80,36S176,103.88,176,84Z" opacity="0.2"></path><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>`,
    pay: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z" opacity="0.2"></path><path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z"></path></svg>`,
  },
  options: {
    getOne: {id: "get-one", cards: 1, value: 200},
    getThree: {id: "get-three", cards: 3, value: 582},
    getSix: {id: "get-six", cards: 6, value: 1128},
    getTwelve: {id: "get-ten", cards: 12, value: 2112},
    getTwenty: {id: "get-twenty", cards: 20, value: 3200},
  },
}
//  TODO criar o estilo genérico para o card

export function getCard() {
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  } else {
    content = document.createElement("div");
    content.classList.add("content");
    content.classList.add("display-flex-col");
  };

  const contentGetCardPage = document.createElement("div");
  contentGetCardPage.classList.add("get-card");

  const coinAreaBox = coinArea();
  contentGetCardPage.appendChild(coinAreaBox);

  const getCardBox = getCardArea();
  contentGetCardPage.appendChild(getCardBox);

  const confirmationBox = document.createElement("div");
  confirmationBox.classList.add("confirmation");
  contentGetCardPage.appendChild(confirmationBox);

  content.appendChild(contentGetCardPage);
  state.view.container.appendChild(content);
}

function coinArea() {
  const coinAreaBox = document.createElement("div");
  coinAreaBox.classList.add("coin-area");

  const imgDiv = document.createElement("div");
  imgDiv.innerHTML = localState.images.dualCoin;
  imgDiv.innerHTML += localState.images.vCoin;
  coinAreaBox.appendChild(imgDiv);

  const coinDiv = document.createElement("div");
  const coinSpan = document.createElement("span");
  coinSpan.textContent = "Você tem: ";
  coinDiv.appendChild(coinSpan);
  const coins = document.createElement("span");
  coins.id = "coins";
  coins.textContent = state.user.coins;
  coinDiv.appendChild(coins);
  coinAreaBox.appendChild(coinDiv);

  coinAreaBox.innerHTML += localState.images.hCoin;
  return coinAreaBox;
}

function getCardArea() {
  const getCardBox = document.createElement("div");
  getCardBox.classList.add("get-card-area");

  for (let key in localState.options) {
    const mainDiv = document.createElement("div");
    mainDiv.id = localState.options[key].id;

    const span = document.createElement("span");
    span.textContent =
      (localState.options[key].cards > 1) ?
        `${localState.options[key].cards} cartas` :
        `${localState.options[key].cards} carta`;
    mainDiv.appendChild(span);

    const button = document.createElement("div");
    button.innerHTML = localState.images.pay;
    button.innerHTML += ` ${localState.options[key].value}`
    button.addEventListener("click", () => tryToBuy(key))

    mainDiv.appendChild(button);

    getCardBox.appendChild(mainDiv);
  }
  return getCardBox;
}

async function tryToBuy(key) {
  const confirmation = document.querySelector(".confirmation");
  confirmation.innerHTML = "";
  if (state.user.coins > localState.options[key].value) {
    const confirmMessage = document.createElement("span");
    confirmMessage.textContent = `Você deseja gastar ${localState.options[key].value} para realizar esta compra?`;

    const buttonArea = document.createElement("div");
    buttonArea.classList.add("button-area");
    
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "confirmar";
    confirmButton.addEventListener("click", async () => await confirmPurchase(key));
    buttonArea.appendChild(confirmButton);

    confirmation.appendChild(confirmMessage);
    confirmation.appendChild(buttonArea);
  } else {
    const confirmMessage = document.createElement("span");
    confirmMessage.textContent = `Faltam ${localState.options[key].value - state.user.coins} para conseguir realizar esta compra.`;
    confirmation.appendChild(confirmMessage);
  }
}

async function confirmPurchase(key) {
  showObtainedCards();
  let cashback = 0;
  const supportArray = [];
  const nameArray = [];
  let cardArea = document.querySelector(".card-area");
  if (cardArea) {
    cardArea.innerHTML = "";
  } else {
    cardArea = document.createElement("div");
    cardArea.classList.add("card-area");
  };
  while (supportArray.length < localState.options[key].cards) {
    const drawnPokemon = await drawCard();
    if (drawnPokemon && !state.user.cards.includes(drawnPokemon.id) && !supportArray.includes(drawnPokemon.id)) {
      state.user.cards.push(drawnPokemon.id);
      supportArray.push(drawnPokemon.id);
      nameArray.push(drawnPokemon.name);
      
      const card = await createCard(drawnPokemon);
      cardArea.appendChild(card);

      await addDataOnArrayField("Users", state.user.id, "cards", drawnPokemon.id);

    } else {
      if (drawnPokemon) {
        cashback += generateCashback(drawnPokemon.base_experience);
      }
    }
  }
  const coins = document.querySelector("#coins");
  state.user.coins -= localState.options[key].value + cashback;
  coins.textContent = state.user.coins;
  await updateFieldDocument("Users", state.user.id, "coins", state.user.coins);
}

function showObtainedCards() {
  const fade = document.createElement("div");
  fade.classList.add("fade")
  state.view.container.appendChild(fade)
  fade.addEventListener("click", () => closeObtainedCards(fade));

  const showCardBox = document.createElement("div");
  showCardBox.classList.add("show-card-box");

  const header = document.createElement("h2");
  header.textContent = "Você obteve as seguintes cartas"
  showCardBox.appendChild(header);

  const cardArea = document.createElement("div");
  cardArea.classList.add("card-area");
  showCardBox.appendChild(cardArea)

  state.view.container.appendChild(showCardBox);
}

function closeObtainedCards(fade) {
  const showCardBox = document.querySelector(".show-card-box");
  showCardBox.remove();
  fade.remove();
}



function generateCashback(base_exp) {
  return Math.floor(Math.sqrt(base_exp));
}

