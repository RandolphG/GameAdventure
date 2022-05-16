type KeyName = "moveUp" | "moveDown" | "moveLeft" | "moveRight";

type KeyboardConfig = Record<KeyName, string>;

type KeyState = {
  isDown: boolean;
};

type KeyboardState = Record<KeyName, KeyState>;

type KeyboardControlsOptions = {
  keyConfig?: Partial<KeyboardConfig>;
};

const DEFAULT_CONTROL_CONFIG = {
  moveUp: "w",
  moveLeft: "a",
  moveDown: "s",
  moveRight: "d"
};

const INITIAL_KEYBOARD_STATE = Object.keys(DEFAULT_CONTROL_CONFIG).reduce(
  (acc, keyName) => ({ ...acc, [keyName]: { isDown: false } }),
  {} as KeyboardState
);

export default class KeyboardControls {
  private keyConfig: KeyboardConfig;
  private keyboardState: KeyboardState;

  constructor(options?: KeyboardControlsOptions) {
    this.keyConfig = { ...DEFAULT_CONTROL_CONFIG, ...options?.keyConfig };
    this.keyboardState = INITIAL_KEYBOARD_STATE;
    this.mountListeners();
  }

  private mountListeners() {
    const keyDownMap = {
      [this.keyConfig.moveUp]: this.moveUpDown,
      [this.keyConfig.moveLeft]: this.moveLeftDown,
      [this.keyConfig.moveDown]: this.moveDownDown,
      [this.keyConfig.moveRight]: this.moveRightDown
    };

    const keyUpMap = {
      [this.keyConfig.moveUp]: this.moveUpUp,
      [this.keyConfig.moveLeft]: this.moveLeftUp,
      [this.keyConfig.moveDown]: this.moveDownUp,
      [this.keyConfig.moveRight]: this.moveRightUp
    };

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const keyDownHandler = keyDownMap[e.key];

      if (keyDownHandler) {
        keyDownHandler();
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const keyUpHandler = keyUpMap[e.key];

      if (keyUpHandler) {
        keyUpHandler();
      }
    });
  }

  public isKeyDown(keyName: KeyName) {
    return this.keyboardState[keyName].isDown;
  }

  // keyDown handlers
  private moveUpDown = () => {
    this.keyboardState.moveUp.isDown = true;
  };

  private moveLeftDown = () => {
    this.keyboardState.moveLeft.isDown = true;
  };

  private moveDownDown = () => {
    this.keyboardState.moveDown.isDown = true;
  };

  private moveRightDown = () => {
    this.keyboardState.moveRight.isDown = true;
  };

  // keyUp handlers
  private moveUpUp = () => {
    this.keyboardState.moveUp.isDown = false;
  };

  private moveLeftUp = () => {
    this.keyboardState.moveLeft.isDown = false;
  };

  private moveDownUp = () => {
    this.keyboardState.moveDown.isDown = false;
  };

  private moveRightUp = () => {
    this.keyboardState.moveRight.isDown = false;
  };
}
