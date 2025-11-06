import PopUp from "./Popup.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { page } from "./constants.js";
import API from "./API.js";

export default class PopupWithForm extends PopUp {
  constructor(selector, handleAddCard) {
    super(selector);

    this._handleAddCard = handleAddCard;

    this.elementFields = this.element.querySelectorAll(".form__field");
    const form_validator = new FormValidator(
      this.element.querySelectorAll(".form__field"),
      this.element.querySelector(".form__button")
    );
    form_validator.enableValidation();
  }

  open() {
    const formTemplate = document.querySelector(this.selector).content;
    const formElement = formTemplate.querySelector(".fullview").cloneNode(true);
    let elementFields = formElement.querySelectorAll(".form__field");
    if (this.selector == "#form-info") {
      formElement.querySelector(".form__title").textContent = "Editar Perfil";
      elementFields[0].value = this.user.name;
      elementFields[1].value = this.user.job;
      elementFields[0].maxLength = "30";
      elementFields[0].minLength = "2";
      elementFields[1].maxLength = "200";
      elementFields[1].minLength = "2";
      elementFields[1].type = "text";
    }
    if (this.selector == "#form-add") {
      formElement.querySelector(".form__title").textContent = "Nuevo lugar";
      elementFields[0].placeholder = "Titulo";
      elementFields[0].maxLength = "40";
      elementFields[0].minLength = "2";
      elementFields[1].type = "url";
      elementFields[1].placeholder = "Enlace a la imagen";
      formElement
        .querySelector(".form__button")
        .classList.remove("button-active");
      formElement.querySelector(".form__button").src =
        "./images/Submit Button cancelled.png";
    }
    if (this.selector == "#form-change-picture") {
      formElement.querySelector(".form__title").textContent =
        "Cambiar foto de perfil";
      elementFields[0].type = "url";
      elementFields[0].placeholder = "Enlace a la imagen";
      formElement
        .querySelector(".form__button")
        .classList.remove("button-active");
      formElement.querySelector(".form__button").src =
        "./images/Submit Button cancelled.png";
    }
    page.prepend(formElement);
    return formElement;
  }

  _setEventListeners() {
    super._setEventListeners();
    if (this.selector == "#form-add") {
      this.element
        .querySelector(".form__button")
        .addEventListener("click", (evt) => {
          if (Array.from(evt.target.classList).includes("button-active")) {
            const new_card = new Card(
              this._getInputValues()[1],
              this._getInputValues()[0]
            );
            this._handleAddCard(new_card);
            this.close();
          }
        });
    }
    if (this.selector == "#form-info") {
      this.element
        .querySelector(".form__button")
        .addEventListener("click", (evt) => {
          if (Array.from(evt.target.classList).includes("button-active")) {
            const responses = this._getInputValues();
            API.update_info(responses).then((res) => {
              this.user.setUserInfo(
                responses[0],
                responses[1],
                document.querySelector(".content__name"),
                document.querySelector(".content__job")
              );
              this.close();
            });
          }
        });
    }
    if (this.selector == "#form-change-picture") {
      this.element
        .querySelector(".form__button")
        .addEventListener("click", (evt) => {
          if (Array.from(evt.target.classList).includes("button-active")) {
            API.change_picture(this);
          }
        });
    }
  }
  _getInputValues() {
    let elementFields = this.element.querySelectorAll(".form__field");
    let arr = [];
    elementFields.forEach((element) => {
      arr.push(element.value);
    });
    return arr;
  }
}
