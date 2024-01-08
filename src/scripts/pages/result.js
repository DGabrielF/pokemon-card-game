import { handleContent, state } from "../main.js";

export function result( winner, coins ){
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  } else {
    content = document.createElement("div");
    content.classList.add("content");
    content.classList.add("display-flex-col");
  };

  
  const contentResult = document.createElement("div");
  contentResult.classList.add("result-page");

  const resultArea = document.createElement("div");
  resultArea.classList.add("result-area")
  
  const duelResult = document.createElement("h3");
  duelResult.classList.add("duel-result");
  
  const coinResult = document.createElement("span");
  coinResult.classList.add("coin-result");
  
  if (winner.name !== state.user.name) {
    duelResult.textContent = "Parabéns, você venceu este duelo!";
    coinResult.textContent = `de acordo com o resultado você obeteve ${coins}`;
  } else {
    duelResult.textContent = "Infelizmente você foi derrotado..."
    coinResult.textContent = `mas você ainda obeteve ${coins}`
  }
  
  resultArea.appendChild(duelResult);
  resultArea.appendChild(coinResult);

  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button-area");

  const buttonDuelAgain = document.createElement("button");
  buttonDuelAgain.textContent = "novo duelo";
  buttonDuelAgain.addEventListener("click", () => handleContent("searchDuel"))
  buttonArea.appendChild(buttonDuelAgain);

  const buttonHome = document.createElement("button");
  buttonHome.textContent = "início";
  buttonHome.addEventListener("click", () => handleContent("homepage"))
  buttonArea.appendChild(buttonHome);

  resultArea.appendChild(buttonArea)
  
  contentResult.appendChild(resultArea)
  content.appendChild(contentResult);
  state.view.container.appendChild(content)
}