const state = {
  contents: {
    getCard: {
      id: "get-card",
      span: "pegar cartas",
      image: "./src/images/add-card.png",
    },
    selectCard: { 
      id: "select-cards",
      span: "suas sartas",
      image: "./src/images/set-card.png",
    },
    searchDuel: {
      id: "search-duel",
      span: "duelar",
      image: "./src/images/versus.png",
    },
    ranking: {
      id: "ranking",
      span: "ranking",
      image: "./src/images/add-card.png",
    },
  },
}

export function homePage (handleContent) {
  const container = document.querySelector(".container");

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

  content.appendChild(contentHomepage);
  container.appendChild(content);
}