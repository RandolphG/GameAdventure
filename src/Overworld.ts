import { DirectionInput } from "./DirectionInput";
import { GameObject } from "./GameObject";
import { KeyPressListener } from "./KeyPressListener";
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
        Object.values(this.map.gameObjects)
          .sort((a: GameObject, b: GameObject) => {
            return a.y - b.y;
          })
          .forEach((object: GameObject) => {
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

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      /*Is there a person to talk to? */
      this.map!.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("person-walking-done", (event: any) => {
      if (event.detail.whoId === "hero") {
        console.log("NEW HERO POSITION");
        /* hero's position has changed */
        this.map!.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig: any) {
    console.log("Change Map to: ", mapConfig);
    this.map = new OverWorldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    console.log("%cOverworld init", "color:green;", this);
    this.startMap(OverWorldMaps.DemoRoom);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    /*this.map.startCutScene([
      { type: "textMessage", text: "Hey how are you doing?" }
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "walk", direction: "right" },
      { who: "hero", type: "stand", direction: "up" }
    ]);*/
  }
}
