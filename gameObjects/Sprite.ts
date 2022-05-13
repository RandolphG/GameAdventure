import { GameObject } from "./GameObject";

interface config {
  src: string;
  gameObject: GameObject;
  animation?: { idleDown: Array<number[]> };
  currentAnimation?: any;
}

const xOffset: number = 16 - 8;
const yOffset: number = 16 - 18;

export class Sprite {
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  gameObject: GameObject;
  animation: { idleDown: Array<number[]> };
  currentAnimation: any;
  useShadow: boolean | undefined;
  isLoaded: boolean | undefined;
  isShadowLoaded: boolean | undefined;

  constructor(config: config) {
    /* set up the image */
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    /*Shadow*/
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    /*Configuring Animation & Initial State */
    this.animation = config.animation || {
      idleDown: [[0, 0]]
    };

    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimation = 0;

    this.gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x: number = this.gameObject.x * xOffset;
    const y: number = this.gameObject.y * yOffset;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
