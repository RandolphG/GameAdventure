import { Sprite } from "./Sprite";

interface config {
  src: string;
  x: number;
  y: number;
}

export class GameObject {
  x: number;
  y: number;
  sprite: Sprite;

  constructor(config: config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({ gameObject: this, src: config.src || "" });
  }
}
