import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const commands = getCommands();
  const pokeapi = new PokeAPI();
  const nextLocationsURL = "https://pokeapi.co/api/v2/location-area";
  const prevLocationsURL = null;
  const pokedex: Record<string, Pokemon> = {};

  return {
    rl,
    commands,
    pokeapi,
    nextLocationsURL,
    prevLocationsURL,
    pokedex,
  };
}
