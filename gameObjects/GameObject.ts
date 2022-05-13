import { Sprite } from "./Sprite";

export class GameObject {
  x: number;
  y: number;
  sprite: Sprite;

  constructor(config: { src: string; x: number; y: number }) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({ gameObject: this, src: config.src || "" });
  }
}
