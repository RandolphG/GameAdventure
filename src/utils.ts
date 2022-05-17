import { Person } from "./Person";

export const utils = {
  withGrid(n: number) {
    return n * 16;
  }
};

export const gridSize = 32;

export const OverWorldMaps: any = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(1),
        src: "/images/characters/people/hero.png"
      })
    }
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(3),
        y: utils.withGrid(6),
        src: "/images/characters/people/hero.png"
      }),
      erio: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(4),
        src: "/images/characters/people/erio.png"
      })
    }
  }
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const xOffset: number = 8;
export const yOffset: number = 18;
