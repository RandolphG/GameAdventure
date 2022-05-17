import { GameObject } from "./GameObject";
import { gridSize, xOffset, yOffset } from "./utils";

interface config {
  src: string;
  gameObject: GameObject;
  animation?: { idleDown: Array<number[]> };
  currentAnimation?: any;
  animationFrameLimit?: number;
}

export class Sprite {
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  gameObject: GameObject;
  animation:
    | { idleDown: Array<number[]> }
    | {
        idleLeft: number[][];
        idleDown: number[][];
        walkDown: number[][];
        walkLeft: number[][];
        idleRight: number[][];
        walkRight: number[][];
        walkUp: number[][];
        idleUp: number[][];
      };
  animationFrameLimit: number;
  animationFrameProgress: number;
  currentAnimation: string;
  currentAnimationFrame: number;
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

    /* shadow */
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    /* configuring animation & initial state */
    this.animation = config.animation || {
      idleDown: [[0, 0]],
      idleRight: [[0, 0]],
      idleUp: [[0, 0]],
      idleLeft: [[0, 0]],
      walkDown: [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0]
      ],
      walkRight: [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1]
      ],
      walkUp: [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2]
      ],
      walkLeft: [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3]
      ]
    };

    this.currentAnimation = config.currentAnimation || "walkRight";
    this.currentAnimationFrame = 0;

    /* how many game loop frames
    we want to show this cut of the sprite sheet */
    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    /* reference the game object */
    this.gameObject = config.gameObject;
  }

  get frame(): number[] {
    return this.animation[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    /* down tick frame progress */
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }

    /* reset the counter and change to the next frame
    and start the process all over again */
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x: number = this.gameObject.x - xOffset;
    const y: number = this.gameObject.y - yOffset;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    /* array of coordinates */
    const [frameX, frameY] = this.frame;

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * gridSize,
        frameY * gridSize,
        gridSize,
        gridSize,
        x,
        y,
        gridSize,
        gridSize
      );

    this.updateAnimationProgress();
  }
}
