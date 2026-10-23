import type { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
  const pageURL = state.prevLocationsURL;

  if (pageURL === null) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeapi.fetchLocations(pageURL);

  for (const location of locations.results) {
    console.log(location.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous ?? null;
}
