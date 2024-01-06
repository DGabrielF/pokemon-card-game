import { handleContent, state } from "../main.js";

export function homePage () {
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  } else {
    content = document.createElement("div");
    content.classList.add("content");
    content.classList.add("display-flex-col");
  };
  const contentHomepage = document.createElement("div");
  contentHomepage.classList.add("homepage");

  for (let key in state.contents) {
    if (key !== "homePage") {
      const mainDiv = document.createElement("div");
      mainDiv.id = state.contents[key].id;
      mainDiv.addEventListener("click", () => handleContent(key))
      
      const divImg = document.createElement("div");
      const image = document.createElement("img");
      image.src = state.contents[key].image;
      divImg.appendChild(image);
      mainDiv.appendChild(divImg);
  
      const span = document.createElement("span");
      span.textContent = state.contents[key].span;
      mainDiv.appendChild(span);
  
      contentHomepage.appendChild(mainDiv);
    }
  }

  content.appendChild(contentHomepage);
  state.view.container.appendChild(content);
}