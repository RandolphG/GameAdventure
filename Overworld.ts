export class Overworld {
  element: Element | null;
  canvas: HTMLCanvasElement | null;
  ctx: any;

  constructor(config: { element: Element | null }) {
    this.element = config.element;
    this.canvas = this.element!.querySelector(".game-canvas");
    this.ctx = this.canvas!.getContext("2d");
  }

  init() {
    const image: HTMLImageElement = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    const x: number = 5;
    const y: number = 6;

    const shadow: HTMLImageElement = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
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

    const hero: HTMLImageElement = new Image();
    hero.onload = () => {
      this.ctx.drawImage(
        hero,
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
    hero.src = "/images/characters/people/hero.png";
  }
}
