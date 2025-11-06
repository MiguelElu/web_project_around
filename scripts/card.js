import { page } from "./constants.js";
import PopUpWithImage from "./PopUpWithImage.js";
import PopUp from "./Popup.js";
import API from "./API.js";

export default class Card {
  constructor(url, name, id, isLiked) {
    this.url = url;
    this.name = name;
    this.id = id;
    this.isLiked = isLiked;
    this.element = this.create();
    this._setEventListeners();
  }
  create() {
    let photoTemplate = document.querySelector("#photo-item").content;
    let photoElement = photoTemplate
      .querySelector(".content__foto-item")
      .cloneNode(true);
    photoElement.querySelector(".content__photo-tag-name").textContent =
      this.name;
    photoElement.querySelector(".content__foto").src = this.url;
    photoElement.querySelector(".content__foto").alt = "Foto de paisaje";
    if (this.isLiked) {
      photoElement.querySelector(".content__like").src =
        "./images/like_active.png";
    }

    return photoElement;
  }

  _setEventListeners() {
    this.element
      .querySelector(".content__like")
      .addEventListener("click", (evt) => {
        API.like_toogle(evt, this.id);
      });
    this.element
      .querySelector(".content__trash-icon")
      .addEventListener("click", () => {
        const confirmation = new PopUp("#confirmation-button");
        const element_to_remove = this.element;
        document
          .querySelector(".confirmation__button")
          .addEventListener("click", () => {
            API.delete_photo(this.id, element_to_remove, confirmation);
          });
      });
    this.element
      .querySelector(".content__foto")
      .addEventListener("click", (evt) => {
        const fullview_image = new PopUpWithImage(
          "#image-fullview",
          evt.target.src
        );
      });
  }
}
