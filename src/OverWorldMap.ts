import { GameObject } from "./GameObject";
import { nudgedXOffset, utils } from "./utils";

interface config {
  gameObjects: GameObject;
  lowerSrc: string;
  upperSrc: string;
  walls: {};
}

export class OverWorldMap {
  gameObjects: GameObject;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls: any;

  constructor(config: config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(nudgedXOffset) - cameraPerson.x,
      utils.withGrid(nudgedXOffset) - cameraPerson.y
    );
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(nudgedXOffset) - cameraPerson.x,
      utils.withGrid(nudgedXOffset) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    console.log(`${x},${y}`);
    return this.walls[`${x},${y}`] || false;
  }
}
