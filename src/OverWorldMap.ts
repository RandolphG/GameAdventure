import { GameObject } from "./GameObject";
import { OverworldEvent } from "./OverworldEvent";
import { constants, utils } from "./utils";

interface config {
  gameObjects: GameObject;
  lowerSrc: string;
  upperSrc: string;
  walls: {};
  cutsceneSpaces: {};
}

type startCutSceneEvents = {
  who?: string;
  type: string;
  direction?: string;
  time?: number;
  text?: string;
};

export class OverWorldMap {
  overworld: any;
  gameObjects: GameObject;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls: any;
  isCutScenePlaying: boolean;
  cutsceneSpaces;

  constructor(config: config) {
    this.overworld = null;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutScenePlaying = false;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(constants.nudgedXOffset) - cameraPerson.x,
      utils.withGrid(constants.nudgedYOffset) - cameraPerson.y
    );
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(constants.nudgedXOffset) - cameraPerson.x,
      utils.withGrid(constants.nudgedYOffset) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(objectKey => {
      let objectToMount = this.gameObjects[objectKey];
      objectToMount.id = objectKey;

      /* determine if this object should actually mount */
      objectToMount.mount(this);
    });
  }

  /* start a loop of async events
  await each one */
  async startCutScene(events: startCutSceneEvents[]) {
    this.isCutScenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      //@ts-ignore
      const eventHandler = new OverworldEvent({ map: this, event: events[i] });

      await eventHandler.init();
    }

    this.isCutScenePlaying = false;

    /* reset NPC to do their idle behavior */
    Object.values(this.gameObjects).forEach(object => {
      object.doBehaviorEvent(this);
    });
  }

  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(x: number, y: number, direction: string) {
    const { x: newX, y: newY } = utils.nextPosition(x, y, direction);
    this.removeWall(x, y);
    this.addWall(newX, newY);
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });

    if (!this.isCutScenePlaying && match && match.talking.length) {
      console.log("MATCH.TALKING[0]", match.talking[0]);
      const ignore = this.startCutScene(match.talking[0].events);
    }

    console.log(match);
  }
  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    console.log("match", match);

    if (!this.isCutScenePlaying && match) {
      const ignore = this.startCutScene(match[0].events);
    }
  }
}
