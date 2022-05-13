import { GameObject } from "./gameObjects/GameObject";

export class Overworld {
  element: Element | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;

  constructor(config: { element: Element | null }) {
    this.element = config.element;
    this.canvas = this.element!.querySelector(".game-canvas");
    this.ctx = this.canvas!.getContext("2d");
  }

  startGameLoop() {}

  init() {
    console.log("Overworld init", this);

    const image: HTMLImageElement = new Image();
    image.onload = () => {
      this.ctx!.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    /*
    const x: number = 5;
    const y: number = 6;

    const shadow: HTMLImageElement = new Image();
    shadow.onload = () => {
      this.ctx!.drawImage(
        shadow,
        0, //left cut
        0, //top cut,
        32, //width of cut
        32, //height of cut
        x * 16 - 8,
        y * 16 - 18,
        32,
        32
      );
    };
    shadow.src = "/images/characters/shadow.png";
    */

    const hero = new GameObject({
      x: 5,
      y: 6,
      src: "/images/characters/people/hero.png"
    });

    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png"
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx!);
      npc1.sprite.draw(this.ctx!);
    }, 200);
  }
}
