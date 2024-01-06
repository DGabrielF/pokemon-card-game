export async function drawCard() {
  const drawnId = randomGenerator();
  const lucky = Math.random();
  const drawnPokemon = await getPokemonData(drawnId);
  const evolved = await isEvolved(drawnId);
  const evolution = await canEvolve(drawnId);
  const baseLucky = .697*evolved - .075*evolution + .035*Math.cbrt(drawnPokemon.base_experience);
  if (lucky>baseLucky) {
    return drawnPokemon
  }
}

export async function createCard(drawnPokemon) {
  if (!drawnPokemon.id && typeof drawnPokemon === "number") {
    drawnPokemon = await getPokemonData(drawnPokemon)
  }
  const card = document.createElement("div");
  card.classList.add("card");
  card.draggable = true;
  card.id = drawnPokemon.id;
  card.key = drawnPokemon.name;
  card.addEventListener("dragstart", (e) => {
    card.style.opacity = '0.1';
    if (e.target.tagName.toLowerCase() === "img" && e.target.parentNode === card) {
      e.preventDefault()
    }
  });
  card.addEventListener('dragend', () => {
    card.style.opacity = '1';
  });
  drawnPokemon.types.forEach((type) => {
    if (drawnPokemon.types.length === 1) {
      card.classList.add(type.type.name);
    }
    else if (drawnPokemon.types.length > 1 && !["normal", "dragon", "flying", "poison"].includes(type.type.name)) {
      card.classList.add(type.type.name);
    }
  });

  const name = document.createElement("span");
  name.textContent = drawnPokemon.name;
  card.appendChild(name);

  const image = document.createElement("img");
  image.draggable = false;
  image.src = (drawnPokemon.sprites.other.dream_world.front_default)?drawnPokemon.sprites.other.dream_world.front_default:drawnPokemon.sprites.front_default;
  image.alt = drawnPokemon.name;
  card.appendChild(image);
  return card;
}

function randomGenerator() {
  return(Math.floor(Math.random()*1017)+1);
}

export async function getPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data
}

async function isEvolved(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  const data = await response.json();
  return (data && data.evolves_from_species)?1:0
}

async function canEvolve(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  const data = await response.json();

  if (data && data.evolution_chain) {
    const chainResponse = await fetch(data.evolution_chain.url);
    const chainData = await chainResponse.json();
    if (chainData.chain) {
      const evolvesTo = chainData.chain.evolves_to;
      return (evolvesTo.length > 0)?1:0
    }
  }
}