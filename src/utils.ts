import { Person } from "./Person";

type constants = {
  gridSize: number;
  xOffset: number;
  yOffset: number;
  nudgedXOffset: number;
  nudgedYOffset: number;
};

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

const constants: constants = {
  gridSize: 32,
  xOffset: 8,
  yOffset: 18,
  nudgedXOffset: 10.5,
  nudgedYOffset: 6
};

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
  },
  emitEvent(eventName: string, detail: any) {
    const event = new CustomEvent(eventName, {
      detail
    });

    document.dispatchEvent(event);
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
        src: "/images/characters/people/erio.png",
        behaviors: [
          { type: "walk", direction: "left", time: 500 },
          { type: "walk", direction: "down", time: 900 },
          { type: "walk", direction: "right", time: 600 },
          { type: "walk", direction: "up", time: 1200 }
        ]
      })
    },
    walls: {
      [utils.asGridCoords(7, 6)]: true,
      [utils.asGridCoords(8, 6)]: true,
      [utils.asGridCoords(7, 7)]: true,
      [utils.asGridCoords(8, 7)]: true
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
