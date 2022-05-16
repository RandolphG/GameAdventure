import { GameObject } from "./GameObject";

export const OverWorldMaps: any = {
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

export const utils = {
  withGrid(n: number) {
    return n * 16;
  }
};
