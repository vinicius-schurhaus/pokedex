import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const cleaned = input.toLowerCase().trim();

  if (cleaned === "") {
    return [];
  }

  return cleaned.split(/\s+/);
}

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", (input) => {
    const clInput = cleanInput(input);

    if (clInput.length === 0) {
      state.rl.prompt();
      return;
    }

    const command = state.commands[clInput[0]];

    if (!command) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      command.callback(state);
    } catch (err) {
      console.error(err);
    } finally {
      state.rl.prompt();
    }
  });
}
