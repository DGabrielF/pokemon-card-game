import { fetchSingleDocumentFromFirebase, firebaseSignin, firebaseSignup } from "../firebase.js";
import { state } from "../main.js";

// Login page and tools
export function loginBox(handlePage, createCentralContainer) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const centralContainer = createCentralContainer();

  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = "Entrar";
  centralContainer.appendChild(title);

  createEntriesArea(centralContainer);

  createLoginButtonsArea(handlePage, centralContainer);

  const recover = document.createElement("div");
  recover.textContent = "Recuperar senha";
  centralContainer.appendChild(recover)

  centralContainer.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleLogin(handlePage);
    }
  });
}
function createEntriesArea(centralContainer) {
  const emailArea = document.createElement("div");
  emailArea.classList.add("entry-area");

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email";
  emailArea.appendChild(emailLabel);
  
  const emailInput = document.createElement("input");
  emailInput.placeholder = "exemplo@teste.com";
  emailInput.id = "e-mail-input";
  emailArea.appendChild(emailInput);

  centralContainer.appendChild(emailArea);

  const passwordArea = document.createElement("div");
  passwordArea.classList.add("entry-area");

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "senha";
  passwordArea.appendChild(passwordLabel);
  
  const passwordInput = document.createElement("input");
  passwordInput.id = "password-input";
  passwordInput.type = "password";
  passwordArea.appendChild(passwordInput);

  centralContainer.appendChild(passwordArea);
}
function createLoginButtonsArea(handlePage ,centralContainer) {
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button-area");

  const loginButton = document.createElement("button");
  loginButton.textContent = "Entrar";
  loginButton.addEventListener("click", () => handleLogin(handlePage));
  buttonArea.appendChild(loginButton);
  
  const signUpButton = document.createElement("button");
  signUpButton.textContent = "Cadastrar";
  signUpButton.addEventListener("click", () => handlePage("signup"));
  buttonArea.appendChild(signUpButton);

  centralContainer.appendChild(buttonArea);
}
async function handleLogin(handlePage) {
  const email = document.getElementById("e-mail-input").value;
  const password = document.getElementById("password-input").value;

  const errors = document.querySelectorAll(".error-message");
  errors.forEach(error => error.remove());

  if (emptyEmailVerify(email) && emptyPasswordVerify(password)) {
    const user = await firebaseSignin(email, password);
    if (!user.uid) {
      const fieldFailedInValidation = document.querySelector(".button-area");
      const message = document.createElement("p");
      message.classList.add("error-message");
      message.textContent = user;
      fieldFailedInValidation.insertAdjacentElement("afterend", message);
    } else {
      const success = document.querySelector(".button-area");
      const message = document.createElement("p");
      message.classList.add("success-message");
      message.textContent = "Conectado com sucesso.";
      success.insertAdjacentElement("afterend", message);
      state.user.id = user.uid;
      setTimeout(await setUser(), 5000);
      setTimeout(handlePage("logedin"), 5000);
    };
  };  
}
async function setUser () {
  if (!state.user.name) {
    state.user = await fetchSingleDocumentFromFirebase("Users", state.user.id);
  }
}
// Register page and tools
export function registerBox(handlePage, createCentralContainer) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const centralContainer = createCentralContainer();

  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = "Registrar";
  centralContainer.appendChild(title);

  createEntriesArea(centralContainer);

  createEntriesRegisterArea(centralContainer);

  createRegisterButtonsArea(handlePage, centralContainer);

  centralContainer.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleRegister(handlePage);
    }
  });
}
function createEntriesRegisterArea(centralContainer) {
  const passwordArea = document.createElement("div");
  passwordArea.classList.add("entry-area");

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Confirme a senha";
  passwordArea.appendChild(passwordLabel);
  
  const passwordInput = document.createElement("input");
  passwordInput.id = "confirm-password-input";
  passwordInput.type = "password";
  passwordArea.appendChild(passwordInput);

  centralContainer.appendChild(passwordArea);
  const emailArea = document.createElement("div");
  emailArea.classList.add("entry-area");

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Nome";
  emailArea.appendChild(emailLabel);
  
  const emailInput = document.createElement("input");
  emailInput.placeholder = "seu nome";
  emailInput.id = "name-input";
  emailArea.appendChild(emailInput);

  centralContainer.appendChild(emailArea);
}
function createRegisterButtonsArea(handlePage, centralContainer) {
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button-area");

  const loginButton = document.createElement("button");
  loginButton.textContent = "Confirmar";
  loginButton.addEventListener("click", () => handleRegister(handlePage));
  buttonArea.appendChild(loginButton);

  const signUpButton = document.createElement("button");
  signUpButton.textContent = "sou cadastrado";
  signUpButton.addEventListener("click", () => handlePage("signin"));
  buttonArea.appendChild(signUpButton);

  centralContainer.appendChild(buttonArea);
}
async function handleRegister(handlePage) {
  const email = document.getElementById("e-mail-input").value;
  const password = document.getElementById("password-input").value;
  const passwordToVerify = document.getElementById("confirm-password-input").value;
  const name = document.getElementById("name-input").value;

  const errors = document.querySelectorAll(".error-message");
  errors.forEach(error => error.remove());

  emptyEmailVerify(email);

  if (passwordValidation(password) && comparePasswords(password, passwordToVerify)) {
    const fail = await firebaseSignup(email, password, name);
    if (fail) {
      const fieldFailedInValidation = document.querySelector(".button-area");
      const message = document.createElement("p");
      message.classList.add("error-message");
      message.textContent = fail;
      fieldFailedInValidation.insertAdjacentElement("afterend", message);
    } else {
      const success = document.querySelector(".button-area");
      const message = document.createElement("p");
      message.classList.add("success-message");
      message.textContent = "Cadastrado com sucesso.";
      success.insertAdjacentElement("afterend", message);
      const message1 = document.createElement("p");
      message1.classList.add("success-message");
      message1.textContent = "Faça seu primeiro login";
      success.insertAdjacentElement("afterend", message1);
      setTimeout(handlePage("signin"), 5000);
    }
  }
}
// Validations
function emptyEmailVerify(email) {
  if (email === "") {
    const emailFailedInValidation = document.querySelector(".entry-area #e-mail-input");
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = "O espaço para o email não pode ficar vazio.";
    emailFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    return false;
  } else return true;
}
function emptyPasswordVerify(password) {
  if (password === "") {
    const passwordFailedInValidation = document.querySelector(".entry-area #password-input");
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = "O espaço para a senha não pode ficar vazio.";
    passwordFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    return false;
  } return true;
}
function comparePasswords (password, passwordToVerify) {
  if (password !== passwordToVerify) {
    const passwordsFailedInValidation = document.querySelector(".entry-area #confirm-password-input");
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = "O espaço para o email não pode ficar vazio.";
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    return false;
  } else {
    return true;
  }
}
function passwordValidation(password) {
  const passwordsFailedInValidation = document.querySelector(".entry-area #password-input");
  let keepGoing = true;
  if (password.length < state.values.password.minPasswordSize) {
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = `A senha deve conter no mínimo ${state.values.password.minPasswordSize} caracteres`;
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    keepGoing = false;
  };
  if (password.length > state.values.password.maxPasswordSize) {
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = `A senha deve conter no máximo ${state.values.password.minPasswordSize} caracteres`;
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    keepGoing = false;
  };
  const numberRegex = /\d/;
  if (numberRegex.test(password) !== state.values.password.needNumbers) {
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = `A senha ${(state.values.password.needNumbers?"deve":"não deve")} conter números`;
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    keepGoing = false;
  };
  const letterRegex = /[a-zA-Z]/;
  if (letterRegex.test(password) !== state.values.password.needLetters) {
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = `A senha ${(state.values.password.needLetters?"deve":"não deve")} conter letras`;
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    keepGoing = false;
  };
  const specialRegex = /[^a-zA-Z0-9\s]/;
  if (specialRegex.test(password) !== state.values.password.needSpecialCharacter) {
    const message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = `A senha ${(state.values.password.needSpecialCharacter?"deve":"não deve")} conter caracteres especiais`;
    passwordsFailedInValidation.parentElement.insertAdjacentElement("afterend", message);
    keepGoing = false;
  };
  return keepGoing;
}