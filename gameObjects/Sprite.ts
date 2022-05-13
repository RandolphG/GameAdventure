import { GameObject } from "./GameObject";

interface config {
  src: string;
  gameObject: GameObject;
  animation?: { idleDown: Array<number[]> };
  currentAnimation?: any;
}

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
    const x: number = this.gameObject.x * 16 - 8;
    const y: number = this.gameObject.y * 16 - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
