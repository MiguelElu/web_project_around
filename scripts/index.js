import Card from "./Card.js";
import PopUpWithImage from "./PopUpWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import { initialCards, page } from "./constants.js";

let form = document.querySelector(".form");

let profile = document.querySelector(".content__profile-info");
let nombre = document.querySelector(".content__name");
let trabajo = document.querySelector(".content__job");

let main = document.querySelector(".content");
let edit_button = document.querySelector(".content__edit-button");
let add_button = document.querySelector(".content__add-button");

//Card.innit();

const gallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.link, item.name);

      gallery.add_Item(card.create());
    },
  },
  ".content__gallery-grid"
);

gallery.renderer();
export default gallery;

/*
function openForm(type) {
  let formTemplate = document.querySelector("form-info").content;
  let formElement = formTemplate.querySelector(".fullview").cloneNode(true);
  let elementFields = formElement.querySelectorAll(".form__field");
  if (type == "Edit") {
    formElement.querySelector(".form__title").textContent = "Editar Perfil";
    elementFields[0].value = nombre.textContent;
    elementFields[1].value = trabajo.textContent;
    elementFields[0].maxLength = "30";
    elementFields[0].minLength = "2";
    elementFields[1].maxLength = "200";
    elementFields[1].minLength = "2";
    elementFields[1].type = "text";
    formElement
      .querySelector(".form__button")
      .addEventListener("click", function (evt) {
        if (Array.from(evt.target.classList).includes("button-active")) {
          save_changes();
          evt.target.parentElement.parentElement.remove();
        }
      });
  }
  if (type == "Add") {
    formElement.querySelector(".form-info").textContent = "Nuevo lugar";
    elementFields[0].placeholder = "Titulo";
    elementFields[0].maxLength = "40";
    elementFields[0].minLength = "2";
    elementFields[1].type = "url";
    elementFields[1].placeholder = "Enlace a la imagen";
    formElement
      .querySelector(".form__button")
      .classList.remove("button-active");
    formElement
      .querySelector(".form__button")
      .classList.remove("button-state-change");
    formElement.querySelector(".form__button").src =
      "./images/Submit Button cancelled.png";
    formElement
      .querySelector(".form__button")
      .addEventListener("click", function (evt) {
        if (Array.from(evt.target.classList).includes("button-active")) {
          const new_card = new Card(
            elementFields[1].value,
            elementFields[0].value
          );
          new_card.create();
          evt.target.parentElement.parentElement.remove();
        }
      });
  }

  formElement
    .querySelector(".form__cancel-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.parentElement.remove();
    });

  page.prepend(formElement);

  const form_validator = new FormValidator(
    document.querySelectorAll(".form__field"),
    document.querySelector(".form__button")
  );
  console.log(form_validator);
  form_validator.enableValidation();
}
  */

function save_changes() {
  let new_data = document.querySelectorAll(".form__field");

  nombre.innerHTML = `${new_data[0].value}`;
  trabajo.innerHTML = `${new_data[1].value}`;
}

edit_button.addEventListener("click", () => {
  const form = new PopupWithForm("#form-info");
});
add_button.addEventListener("click", () => {
  const form = new PopupWithForm("#form-add", (card) => {
    gallery.add_Item(card);
  });
});
