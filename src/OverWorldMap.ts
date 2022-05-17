import { GameObject } from "./GameObject";
import { nudgedXOffset, utils } from "./utils";

interface config {
  gameObjects: GameObject;
  lowerSrc: string;
  upperSrc: string;
}

export class OverWorldMap {
  gameObjects: GameObject;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;

  constructor(config: config) {
    this.gameObjects = config.gameObjects;

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
}
