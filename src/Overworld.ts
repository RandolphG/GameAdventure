import { DirectionInput } from "./DirectionInput";
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
  directionInput: DirectionInput | undefined;

  constructor(config: config) {
    this.element = config.element;
    this.canvas = this.element!.querySelector(".game-canvas");
    this.ctx = this.canvas!.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      /* clear canvas on start game loop */
      this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

      /* establish the camera person */
      // @ts-ignore
      const cameraPerson = this.map?.gameObjects.hero;

      /* update all objects */
      if (this.map) {
        Object.values(this.map.gameObjects).forEach((object: GameObject) => {
          object.update({
            arrow: this.directionInput?.direction,
            map: this.map
          });
        });
      }

      /* draw lower layer */
      this.map?.drawLowerImage(this.ctx!, cameraPerson);

      /* draw game objects */
      if (this.map) {
        Object.values(this.map.gameObjects).forEach((object: GameObject) => {
          object.sprite.draw(this.ctx!, cameraPerson);
        });
      }

      /* draw Upper layer */
      this.map?.drawUpperImage(this.ctx!, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    console.log("%cOverworld init", "color:green;", this);
    this.map = new OverWorldMap(OverWorldMaps.DemoRoom);
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    // this.directionInput.direction;
    this.startGameLoop();
  }
}
