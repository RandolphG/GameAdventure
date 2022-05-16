import { GameObject } from "./GameObject";
import { OverWorldMap } from "./OverWorldMap";
import { OverWorldMaps } from "./utils";

interface config {
  element: Element | null;
}

export class Overworld {
  element: Element | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  map: OverWorldMap | undefined;

  constructor(config: config) {
    this.element = config.element;
    this.canvas = this.element!.querySelector(".game-canvas");
    this.ctx = this.canvas!.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      /* clear canvas on start game loop */
      this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

      /*Draw lower layer*/
      this.map?.drawLowerImage(this.ctx!);

      if (this.map) {
        Object.values(this.map.gameObjects).forEach((object: GameObject) => {
          object.sprite.draw(this.ctx!);
        });
      }

      /*Draw Upper layer*/
      this.map?.drawUpperImage(this.ctx!);
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    console.log("Overworld init", this);
    this.map = new OverWorldMap(OverWorldMaps.DemoRoom);
    this.startGameLoop();

    /*
    const image: HTMLImageElement = new Image();
    image.onload = () => {
      this.ctx!.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";


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
    */
  }
}
