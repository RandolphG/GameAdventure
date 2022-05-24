import { OverworldEvent } from "./OverworldEvent";
import { OverWorldMap } from "./OverWorldMap";
import { Sprite } from "./Sprite";

interface config {
  src: string;
  x: number;
  y: number;
  direction?: string;
  isPlayerControlled?: boolean;
  behaviors?: behaviors;
}

interface IGameObject {
  x: number;
  y: number;
  sprite: Sprite;
  direction: string;
  behaviors?: behaviors;
}

type behavior = {
  who?: string;
  type: string;
  direction: string;
  time?: number;
  retry?: boolean;
};

type behaviors = Array<behavior>;

export class GameObject implements IGameObject {
  id: string | null;
  x: number;
  y: number;
  sprite: Sprite;
  direction: string;
  isMounted: boolean;
  behaviors: behaviors;
  behaviorsIndex: number;
  isStanding: boolean;

  constructor(config: config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({ gameObject: this, src: config.src || "" });
    this.direction = config.direction || "down";
    this.behaviors = config.behaviors || [];
    this.behaviorsIndex = 0;
    this.isStanding = false;
  }

  mount(map: OverWorldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    /* if we have a behavior kick off after a short delay */
    setTimeout(() => {
      this.doBehaviorEvent(map).then(r => {});
    }, 10);
  }

  async doBehaviorEvent(map: OverWorldMap) {
    /* don't do anything if there is a more important cutscene or
     *  I don't have config to do anything anyway */
    if (
      map.isCutScenePlaying ||
      this.behaviors.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    /* setting up our event with relevant info */
    let event: any = this.behaviors[this.behaviorsIndex];
    event.who = this.id;

    const config = { map, event };

    /* create an event instance out of our next event */
    const eventHandler = new OverworldEvent(config);
    await eventHandler.init();

    /* setting the next event to fire */
    this.behaviorsIndex++;
    if (this.behaviorsIndex === this.behaviors.length) {
      this.behaviorsIndex = 0;
    }

    /* do it again */
    this.doBehaviorEvent(map).then(r => {});
  }

  update(state?: { arrow: string; map?: OverWorldMap }) {}
}
