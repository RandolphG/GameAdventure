import { OverWorldMap } from "./OverWorldMap";

interface config {
  map: OverWorldMap;
  event: eventConfig;
}

export type eventConfig = {
  who: string;
  type: string;
  direction: string;
  time: number;
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
    const who = this.map.gameObjects[this.event.who];
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
    const who = this.map.gameObjects[this.event.who];
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
}