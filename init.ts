import { GamepadInput } from "./src/inputs/gamepadInput";
import { Overworld } from "./src/Overworld";

if (typeof document !== "undefined") {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });

  const gameInput = new GamepadInput();

  overworld.init();
}
