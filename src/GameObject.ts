import { Sprite } from "./Sprite";

interface config {
  src: string;
  x: number;
  y: number;
  direction?: string;
}

interface IGameObject {
  x: number;
  y: number;
  sprite: Sprite;
  direction: string;
}

export class GameObject implements IGameObject {
  x: number;
  y: number;
  sprite: Sprite;
  direction: string;

  constructor(config: config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({ gameObject: this, src: config.src || "" });
    this.direction = config.direction || "down";
  }

  update(state?: { arrow: string }) {}
}
