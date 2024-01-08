import { fetchDataFromFirebase } from "../firebase.js";
import { cleanOrCreateBox, state } from "../main.js";

const localState = {
  arrayOfPlayers: [],
  page: {
    nowPage: 0,
    minShowed: 0,
    maxShowed: 0,
    maxNumber: 0,
  },
  criteria: "victories",
  filters: {
    cards: {
      text:"Quantidade de cartas",
    },
    matchesPlayed: {
      text: "Duelos jogados",
    },
    victories: {
      text: "Número de vitórias",
    },
    performance: {
      text: "Aproveitamento",
    }
  },
  isFilterMenuOpen: false,
}

export async function ranking() {  
  const content = cleanOrCreateBox("content");
  content.classList.add("display-flex-col");
  
  const contentRanking = document.createElement("div");
  contentRanking.classList.add("ranking-page");
  
  const filterArea = document.createElement("div");
  const filterSpan = document.createElement("span");
  filterSpan.textContent = localState.filters[localState.criteria].text;
  filterArea.appendChild(filterSpan);
  filterArea.addEventListener("click", () => {
    handleFilterMenu(filterSpan, filterArea);
  })
  filterArea.classList.add("filter-area");

  contentRanking.appendChild(filterArea);
  
  localState.arrayOfPlayers = await fetchDataFromFirebase("Users");
  localState.arrayOfPlayers.forEach(player => {
    player.performance = parseFloat((player.victories / player.matchesPlayed).toFixed(2)) || 0;
  })
  localState.page.maxNumber = Math.floor(localState.arrayOfPlayers.length / 10);

  const playerPosition = document.createElement("div");
  playerPosition.classList.add("player-position");
  contentRanking.appendChild(playerPosition);
  
  const rankingBox = createRanking();
  contentRanking.appendChild(rankingBox);
  
  if (localState.page.maxNumber > 0) {
    const buttonArea = createPageButtons();
    contentRanking.appendChild(buttonArea);
  }  
  content.appendChild(contentRanking);
  state.view.container.appendChild(content);
}
function handleFilterMenu(filterSpan, filterArea) {
  if (!localState.isFilterMenuOpen) {
    const filterMenu = document.createElement("div");
    filterMenu.classList.add("filter-menu");
    for (const filter in localState.filters) {
      if (filter !== localState.criteria) {
        const filterItem = document.createElement("button");
        filterItem.textContent = localState.filters[filter].text;
        filterItem.addEventListener("click", () => {
          localState.criteria = filter;
          localState.page.nowPage = 0;
          filterSpan.textContent = localState.filters[filter].text;
          createRanking();
        });
        filterMenu.appendChild(filterItem);
      }
    }
    localState.isFilterMenuOpen = !localState.isFilterMenuOpen;
    filterArea.appendChild(filterMenu);
  } else {
    localState.isFilterMenuOpen = !localState.isFilterMenuOpen;
    const filterMenu = document.querySelector(".filter-menu");
    filterMenu.remove();
  }
}
function createRanking() {
  const rankingBox = cleanOrCreateBox("ranking-area");

  const rankedPlayers = getTheRankingInMultiplesOFTen();
  rankedPlayers.forEach((player, index) => {
    const div = rankedItem(index, player);
    rankingBox.appendChild(div);
  });
  return rankingBox;
}
function createPageButtons() {
  const buttonArea = cleanOrCreateBox("pages-area");
  if (localState.page.maxNumber >= 0) {
    const leftButton = document.createElement("button");
    leftButton.disabled = (localState.page.nowPage === 0);
    leftButton.innerHTML = state.images.icons.caretLeft;
    leftButton.id = "left-button";
    leftButton.addEventListener("click", () => {
      localState.page.nowPage -= 1;
      togglePage(localState.page.nowPage);
    });
    buttonArea.appendChild(leftButton);
    if (localState.page.nowPage <= 2) {
      localState.page.minShowed = 0;
      localState.page.maxShowed = 4;
    }
    if (localState.page.nowPage >= localState.page.maxNumber - 1) {
      localState.page.minShowed = localState.page.maxNumber - 3;
      localState.page.maxShowed = localState.page.maxNumber + 1;
    }
    if (localState.page.nowPage > 2 && localState.page.nowPage < localState.page.maxNumber - 1) {
      localState.page.minShowed = localState.page.nowPage - 2;
      localState.page.maxShowed = localState.page.nowPage + 2;
    }
    for (let page = localState.page.minShowed; page <= localState.page.maxShowed; page++) {
      const button = document.createElement("button");
      button.classList.add("page");
      if (page === localState.page.nowPage) {
        button.classList.add("selected")
      }
      button.textContent = page + 1;
      button.addEventListener("click", () => togglePage(page));
      buttonArea.appendChild(button);
    }
    const rightButton = document.createElement("button");
    rightButton.disabled = (localState.page.nowPage === localState.page.maxNumber + 1);
    rightButton.innerHTML = state.images.icons.caretRight;
    rightButton.id = "right-button";
    rightButton.addEventListener("click", () => {
      localState.page.nowPage += 1;
      togglePage(localState.page.nowPage);
    });
    buttonArea.appendChild(rightButton);
  }
  return buttonArea;
}
function rankedItem(index, player) {
  const div = document.createElement("div");
  div.classList.add("ranking-item");

  const span = document.createElement("span");
  span.textContent = `#${index + 1}`;
  div.appendChild(span);

  const name = document.createElement("span");
  name.textContent = player.name;
  div.appendChild(name);

  const value = document.createElement("span");
  if (localState.criteria === "cards") {
    value.textContent = player[localState.criteria].length;
  } else if (["matchesPlayed", "victories", "performance"].includes(localState.criteria)) {
    value.textContent = (player[localState.criteria])?player[localState.criteria]:0;
  }
  div.appendChild(value);
  return div;
}
function togglePage(page) {
  localState.page.nowPage = page;
  getTheRankingInMultiplesOFTen();
  createPageButtons();
}
function getTheRankingInMultiplesOFTen() {
  const sortedPlayers = localState.arrayOfPlayers.slice(0);
  sortedPlayers.sort((a, b) => b[localState.criteria] - a[localState.criteria])
  const minRank = 0 + (10 * localState.page.nowPage);
  const maxRank = 10 + (10 * localState.page.nowPage);
  return sortedPlayers.slice(minRank, maxRank);
}