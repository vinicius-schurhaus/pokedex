import { type CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 locations",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Explore a location area and list the Pokémon found there",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throw a pokeball and try to catch pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a Pokemon in your Pokedex",
      callback: commandInspect,
    },
  };
}
