export default class PopUp {
  constructor(selector) {
    this.selector = selector;
  }
  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  open() {}

  close() {
    this.element.remove();
  }

  _setEventListeners() {
    this.element
      .querySelector(".form__cancel-button")
      .addEventListener("click", () => {
        this.close();
      });
    this.element.addEventListener("click", (evt) => {
      if (
        Array.from(evt.target.classList).some((cls) => cls.includes("fullview"))
      ) {
        this.close();
      }
    });
  }
}
