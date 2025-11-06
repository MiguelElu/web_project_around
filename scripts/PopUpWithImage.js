import PopUp from "./Popup.js";
import { page } from "./constants.js";

export default class PopUpWithImage extends PopUp {
  constructor(selector, url) {
    this.selector = selector;
    this.url = url;
    this.element = this.open();
    this._setEventListeners();
    this._handleEscClose();
  }

  open() {
    const formTemplate = document.querySelector(this.selector).content;
    const formElement = formTemplate.querySelector(".fullview").cloneNode(true);
    formElement.querySelector(".fullview__image").src = this.url;
    page.prepend(formElement);
    return formElement;
  }
}
