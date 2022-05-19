export class DirectionInput {
  heldDirection: any[];
  map: {
    ArrowUp: string;
    ArrowDown: string;
    ArrowLeft: string;
    ArrowRight: string;
    KeyW: string;
    KeyS: string;
    KeyA: string;
    KeyD: string;
  };

  constructor() {
    this.heldDirection = [];
    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right"
    };
  }

  get direction() {
    return this.heldDirection[0];
  }

  init() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      // console.log(e.code);
      const dir = this.map[e.code];

      /* if we find a direction that does not exist in our way
       * then we want to unshift it to the front of the array
       * */
      if (dir && this.heldDirection.indexOf(dir) === -1) {
        this.heldDirection.push(dir);
      }
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      const dir = this.map[e.code];
      if (dir) {
        const index = this.heldDirection.indexOf(dir);
        if (index > -1) {
          this.heldDirection.splice(index, 1);
        }
      }
    });
  }
}
