import { GameObject } from "./GameObject";
import { OverWorldMap } from "./OverWorldMap";
import { utils } from "./utils";

interface config {
  src: string;
  x: number;
  y: number;
  direction?: string;
  isPlayerControlled?: boolean;
  behaviors?: Array<{ type: string; direction: string; time: number }>;
}

type state = { arrow?: string; map?: OverWorldMap };

type behavior = {
  type: string;
  direction: string;
  time?: number;
  retry?: boolean;
};

type directionUpdate = {
  up: Array<number | string>;
  down: Array<number | string>;
  left: Array<number | string>;
  right: Array<number | string>;
};

export class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: directionUpdate;
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

  update(state: { arrow: string; map?: OverWorldMap }) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    }

    /* don't let characters change directions
      until done moving to next cell */
    if (
      !state.map?.isCutScenePlaying &&
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state?.arrow
    ) {
      this.startBehavior(state, { type: "walk", direction: state.arrow });
    }
    this.updateSprite();
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining--;

    if (this.movingProgressRemaining === 0) {
      /* we finished walking */
      utils.emitEvent("person-walking-done", { whoId: this.id });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk" + utils.capitalize(this.direction));
      return;
    }

    this.sprite.setAnimation("idle" + utils.capitalize(this.direction));
  }

  startBehavior(state: state, behavior: behavior) {
    /* set character direction to whatever behavior has */
    this.direction = behavior.direction;

    if (behavior.type === "walk") {
      /* stop if the space is not free */
      if (state.map?.isSpaceTaken(this.x, this.y, this.direction)) {
        /* if there is retry wait and start again */
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        return;
      }

      /* reset out counter - ready to walk */
      state.map?.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite();
    }

    if (behavior.type === "stand") {
      setTimeout(() => {
        utils.emitEvent("person-standing-done", { whoId: this.id });
      }, behavior.time);
    }
  }
}
