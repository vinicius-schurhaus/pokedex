import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  pokemonName: string,
): Promise<void> {
  const caught = state.pokedex[pokemonName];

  if (caught) {
    console.log(`Name: ${caught.name}`);
    console.log(`Height: ${caught.height}`);
    console.log(`Weight: ${caught.weight}`);

    console.log("Stats:");
    for (const stat of caught.stats) {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log("Types:");
    for (const type of caught.types) {
      console.log(`  - ${type.type.name}`);
    }
  } else {
    console.log("You have not caught that Pokemon");
  }
}
