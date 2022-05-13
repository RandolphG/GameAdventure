import { GameObject } from "./gameObjects/GameObject";
import { Overworld } from "./Overworld";

if (typeof document !== "undefined") {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });

  overworld.init();
}

const OverWorldMap: any = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObject: {
      hero: new GameObject({
        x: 5,
        y: 6,
        src: "/images/characters/people/hero.png"
      }),
      npc1: new GameObject({
        x: 5,
        y: 6,
        src: "/images/characters/people/npc1.png"
      })
    }
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObject: {
      hero: new GameObject({
        x: 3,
        y: 1,
        src: "/images/characters/people/hero.png"
      }),
      npc1: new GameObject({
        x: 9,
        y: 2,
        src: "/images/characters/people/npc1.png"
      })
    }
  }
};
