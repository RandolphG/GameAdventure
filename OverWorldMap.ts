import { GameObject } from "./gameObjects/GameObject";

declare global {
  interface Window {
    OverWorldMap: any;
  }
}

export class OverWorldMap {
  gameObject: GameObject;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;

  constructor(config: any) {
    this.gameObject = config.gameObject;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }
}
