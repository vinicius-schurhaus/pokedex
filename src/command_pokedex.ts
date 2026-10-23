import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokedex = state.pokedex;

  if (Object.keys(pokedex).length > 0) {
    console.log("Your Pokedex:");

    for (const pokemon of Object.values(pokedex)) {
      console.log(` - ${pokemon.name}`);
    }
  } else {
    console.log("Your Pokedex is empty. Catch some Pokemon to get started!");
  }
}
