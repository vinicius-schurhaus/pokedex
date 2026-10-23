import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName: string,
): Promise<void> {
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const catchChance = 1 - pokemon.base_experience / 1000;
  const caught = Math.random() < catchChance;

  if (caught) {
    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
