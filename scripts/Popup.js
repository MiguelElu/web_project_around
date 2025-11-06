import { page } from "./constants.js";
import UserInfo from "./UserInfo.js";

export default class PopUp {
  constructor(selector) {
    this.selector = selector;
    this.user = new UserInfo(
      document.querySelector(".content__name").textContent,
      document.querySelector(".content__job").textContent
    );
    this.element = this.open();
    this._handleEscClose();
    this._setEventListeners();
  }
  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  open() {
    const formTemplate = document.querySelector(this.selector).content;
    const formElement = formTemplate.querySelector(".fullview").cloneNode(true);
    page.prepend(formElement);
    return formElement;
  }

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
    this.element.addEventListener("click", (evt) => {
      if (
        Array.from(evt.target.classList).some((cls) =>
          cls.includes("button-active")
        )
      ) {
        evt.target.src = "./images/Submit Button guardando.png";
      }
    });
  }
}
