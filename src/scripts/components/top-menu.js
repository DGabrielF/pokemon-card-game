import { state } from "../main.js";

const localState = {
  icons: {
    profile: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>',
  },
  view: {
    container: document.querySelector(".container"),
  },
  profileMenu: [
    { name: "ver perfil", page: "profile"},
    { 
      name: "amigos", 
      page: "friends", 
      subItems: 
        [
          {name: "adicionar", page: "addFriend"},
          {name: "remover", page: "removeFriend"},
        ],
    },
    { name: "configurações", page: "configs"},
  ],
  menuItems: [
    { name: "item 1", page: "pageOne" },
    { name: "item 2", page: "pageTwo" },
    { name: "item 3", page: "pageThree" },
  ],
}

function handleMenu () {
  const menu = document.querySelector(".list-menu");
  let listMenu = document.querySelector(".sub-list-menu");
  if (listMenu) {
    listMenu.remove();
  } else {
    listMenu = document.createElement("div");
    listMenu.classList.add("sub-list-menu");
    localState.menuItems.forEach( item => {
      const element = document.createElement("button");
      element.classList.add("menu-item");
      element.textContent = item.name;
      listMenu.appendChild(element);
    });
    menu.appendChild(listMenu);
  };
}

function confirmLogoutWindow (handlePage) {
  const floatingWindow = document.createElement("div");
  floatingWindow.classList.add("central-container")

  const header = document.createElement("h2");
  header.classList.add("title");
  header.textContent = "sair";
  floatingWindow.appendChild(header);
  
  const text = document.createElement("span");
  text.textContent = "Deseja realmente sair?"
  floatingWindow.appendChild(text);

  const buttonArea = document.createElement("div")
  buttonArea.classList.add("button-area")
  
  const confirm = document.createElement("button");
  confirm.textContent = "confirmar";
  confirm.addEventListener("click", () => handlePage("signin"));
  buttonArea.appendChild(confirm);
  
  const cancel = document.createElement("button");
  cancel.textContent = "cancelar";
  cancel.addEventListener("click", () => {
    const logoutWindow = document.querySelector(".central-container")
    logoutWindow.remove()
  })
  buttonArea.appendChild(cancel);

  floatingWindow.appendChild(buttonArea);

  localState.view.container.appendChild(floatingWindow)
}

function handleProfileSubMenu (handlePage) {
  const profileMenu = document.querySelector(".profile-menu");
  let subMenu = document.querySelector(".sub-profile-menu")
  if (subMenu) {
    subMenu.remove();
  } else {
    subMenu = document.createElement("div");
    subMenu.classList.add("sub-profile-menu");
    localState.profileMenu.forEach( item => {
      const element = document.createElement("div");
      element.classList.add("sub-profile-item");
      const title = document.createElement("span");
      title.textContent = item.name;
      element.appendChild(title);  
      if (item.subItems) {
        item.subItems.forEach( (subItem) => {
          const separator = document.createElement("div");
          separator.classList.add("separator");
          const itemList = document.createElement("div");
          itemList.textContent = subItem.name;
          itemList.classList.add("sub-profile-subitem");
          element.appendChild(itemList);
        })
      };
      subMenu.appendChild(element);
    });
    const logout = document.createElement("div");
    logout.classList.add("sub-profile-item");
    const logoutSpan = document.createElement("span");
    logoutSpan.textContent = "sair";
    logout.appendChild(logoutSpan);
    logout.addEventListener("click", () => {
      confirmLogoutWindow(handlePage)
    });
    subMenu.appendChild(logout);
    profileMenu.appendChild(subMenu);
  };
}

export function topMenu(handlePage) {
  localState.view.container.innerHTML = "";
  localState.view.container.classList.add("display-flex-col");

  const topMenu = document.createElement("div");
  topMenu.classList.add("top-menu");

  const listMenu = document.createElement("div");
  listMenu.addEventListener("click", () => handleMenu())
  listMenu.classList.add("list-menu");
  const listMenuText = document.createElement("span");
  listMenuText.textContent = "menu";
  listMenu.appendChild(listMenuText);
  listMenu.innerHTML += localState.icons.menu;
  topMenu.appendChild(listMenu);
  
  const profileMenu = document.createElement("div");
  profileMenu.addEventListener("click", () => handleProfileSubMenu(handlePage))
  profileMenu.classList.add("profile-menu");  
  const nameUser = document.createElement("span");
  nameUser.textContent = state.user.name;
  profileMenu.appendChild(nameUser);
  profileMenu.innerHTML += localState.icons.profile;  
  topMenu.appendChild(profileMenu);

  localState.view.container.appendChild(topMenu);
}