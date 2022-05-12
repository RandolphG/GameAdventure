import { Overworld } from "./Overworld";

if (typeof document !== "undefined") {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });

  overworld.init();
}
