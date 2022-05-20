import { Person } from "./Person";

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}
const gridSize = 32;
const xOffset: number = 8;
const yOffset: number = 18;
const nudgedXOffset: number = 10.5;
const nudgedYOffset: number = 6;

const utils = {
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  withGrid(n: number) {
    return n * 16;
  },
  asGridCoords(x: number, y: number) {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(initialX: number, initialY: number, direction: string) {
    let x: number = initialX;
    let y: number = initialY;
    const size: number = 16;

    switch (direction) {
      case Direction.Up:
        y -= size;
        break;
      case Direction.Down:
        y += size;
        break;
      case Direction.Left:
        x -= size;
        break;
      case Direction.Right:
        x += size;
        break;
    }

    return {
      x,
      y
    };
  }
};

const OverWorldMaps: any = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(1),
        y: utils.withGrid(4),
        src: "/images/characters/people/hero.png"
      }),
      erio: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(5),
        src: "/images/characters/people/erio.png"
      })
    },
    walls: {
      [utils.asGridCoords(7, 6)]: true,
      [utils.asGridCoords(8, 6)]: true,
      [utils.asGridCoords(7, 7)]: true,
      [utils.asGridCoords(8, 7)]: true
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
        y: utils.withGrid(5),
        src: "/images/characters/people/erio.png"
      })
    }
  }
};

export {
  utils,
  gridSize,
  xOffset,
  yOffset,
  nudgedXOffset,
  nudgedYOffset,
  OverWorldMaps
};
