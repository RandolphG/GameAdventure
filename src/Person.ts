import { GameObject } from "./GameObject";
import { capitalize } from "./utils";

interface config {
  src: string;
  x: number;
  y: number;
  direction?: string;
  isPlayerControlled?: boolean;
}

type state = { arrow: string };

export class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: {
    up: Array<number | string>;
    down: Array<number | string>;
    left: Array<number | string>;
    right: Array<number | string>;
  };
  isPlayerControlled: boolean;

  constructor(config: config) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1]
    };
  }

  update(state: state) {
    this.updatePosition();
    this.updateSprite(state);

    /* dont let characters change directions
    until done moving to next cell */
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state?.arrow
    ) {
      this.direction = state.arrow;

      /* reset out counter */
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining--;
    }
  }

  updateSprite(state: state) {
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state?.arrow
    ) {
      this.sprite.setAnimation("idle" + capitalize(this.direction));
      return;
    }
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk" + capitalize(this.direction));
    }
  }
}
