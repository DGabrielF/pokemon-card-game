import { fetchIdsFromCollection, fetchSingleDocumentFromFirebase } from "../firebase.js";
import { state } from "../main.js";
import { battle } from "./battle.js";

const localState = {
  users: [],
  npcs: [],
}

export async function searchDuel() {  
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
  
  const enemyIA = document.createElement("div");
  enemyIA.classList.add("enemy-ia");  
  fillIAEnemies(enemyIA);
  contentSelectCardPage.appendChild(enemyIA);

  const refreshIA = document.createElement("button");
  refreshIA.textContent = "atualizar";
  refreshIA.addEventListener("click", () => fillIAEnemies(enemyIA));
  contentSelectCardPage.appendChild(refreshIA);
  
  const enemyPlayer = document.createElement("div");
  enemyPlayer.classList.add("enemy-player");
  fillUserEnemies(enemyPlayer);
  contentSelectCardPage.appendChild(enemyPlayer);

  const refreshPlayer = document.createElement("button");
  refreshPlayer.textContent = "atualizar";
  refreshPlayer.addEventListener("click", () => fillUserEnemies(enemyPlayer));
  contentSelectCardPage.appendChild(refreshPlayer);

  content.appendChild(contentSelectCardPage);
  state.view.container.appendChild(content);
}

async function fillIAEnemies(enemyIA) {
  enemyIA.innerHTML = "";
  localState.npcs = await fetchIdsFromCollection("NPCs");
  const showedIAEnemies = [];
  while (showedIAEnemies.length < 5) {
    if (showedIAEnemies.length === localState.npcs.length) {
      break
    }
    const id = Math.floor(Math.random() * localState.npcs.length);
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    if (!showedIAEnemies.includes(id)) {
      showedIAEnemies.push(id);
      const item = await fetchSingleDocumentFromFirebase("NPCs", localState.npcs[id]);

      const IASpan = document.createElement("span");
      IASpan.textContent = item.name;
      enemy.appendChild(IASpan);

      const duelButton = document.createElement("div");
      duelButton.innerHTML = state.attributes.attack.image;
      duelButton.addEventListener("click", (e) => battle(state.user, item, "NPCs"));
      enemy.appendChild(duelButton);

      enemyIA.appendChild(enemy);
    }
  };
}
async function fillUserEnemies(enemyPlayer) {
  enemyPlayer.innerHTML = "";
  localState.users = await fetchIdsFromCollection("Users");
  const showedUsersEnemies = [];
  while (showedUsersEnemies.length < 5) {
    if (showedUsersEnemies.length === localState.users.length - 1) {
      break
    }
    const id = Math.floor(Math.random() * localState.users.length);
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    if (!showedUsersEnemies.includes(id) && localState.users[id] !== state.user.id) {
      const item = await fetchSingleDocumentFromFirebase("Users", localState.users[id]);      
      showedUsersEnemies.push(id);

      const IASpan = document.createElement("span");
      IASpan.textContent = item.name;
      enemy.appendChild(IASpan);
      if (item.hand.length === 6) {
        const duelButton = document.createElement("div");
        duelButton.innerHTML = state.images.attributes.attack;
        duelButton.addEventListener("click", (e) => battle(state.user, item, "Users"));
        enemy.appendChild(duelButton);
      }
      
      enemyPlayer.appendChild(enemy);
    }
  };
}