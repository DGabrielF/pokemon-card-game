async function getPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}
const bulbassaur = getPokemonData(1)
const venussaur = getPokemonData(3)
console.log(getPokemonData(1))
console.log(getPokemonData(3))