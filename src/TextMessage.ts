type textMessage = { text: string | undefined; onComplete: () => void };

export class TextMessage {
  text: string | undefined;
  onComplete: () => void;
  element: HTMLDivElement | null;

  constructor({ text, onComplete }: textMessage) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");
    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
    `;
  }

  init(container: HTMLDivElement) {
    this.createElement();
    container.appendChild(<Node>this.element);
  }
}
