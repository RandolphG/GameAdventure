import { OverWorldMap } from "./OverWorldMap";
import { TextMessage } from "./TextMessage";
import { OverWorldMaps, utils } from "./utils";

interface config {
  map: OverWorldMap;
  event: eventConfig;
}

export type eventConfig = {
  who?: string;
  type: string;
  direction: string;
  time?: number;
  text?: string;
  faceHero?: string;
  map?: string;
};

export type textMessageEventConfig = {
  type: string;
  text?: string;
};

export class OverworldEvent {
  map: OverWorldMap;
  event: eventConfig;

  constructor({ map, event }: config) {
    this.map = map;
    this.event = event;
    this.init().then(R => {});
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve);
    });
  }

  stand(resolve: () => {}) {
    const who = this.map.gameObjects[this.event.who!];
    const state = { map: this.map };

    who.startBehavior(state, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    });

    /* set up a handler to complete when correct person
    is done walking, then resolve the event */
    const completeHandler = (event: any) => {
      if (event.detail.whoId === this.event.who) {
        document.removeEventListener("person-standing-done", completeHandler);
        resolve();
      }
    };

    document.addEventListener("person-standing-done", completeHandler);
  }

  walk(resolve: () => {}) {
    const who = this.map.gameObjects[this.event.who!];
    const state = { map: this.map };

    who.startBehavior(state, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    });

    /* set up a handler to complete when correct person
    is done walking, then resolve the event */
    const completeHandler = (event: any) => {
      if (event.detail.whoId === this.event.who) {
        document.removeEventListener("person-walking-done", completeHandler);
        resolve();
      }
    };

    document.addEventListener("person-walking-done", completeHandler);
  }

  textMessage(resolve: () => {}) {
    /* face the hero */
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero!];
      obj.direction = utils.oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    });

    message.init(document.querySelector(".game-container")!);
  }

  /* instantiate the new map */
  changeMap(resolve: any) {
    this.map.overworld.startMap(OverWorldMaps[this.event.map!]);
    resolve();
  }
}
