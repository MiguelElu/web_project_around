import Card from "./Card.js";
import PopUpWithImage from "./PopUpWithImage.js";
import PopUp from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import API from "./API.js";

let form = document.querySelector(".form");

let avatar = document.querySelector(".content__avatar");
let nombre = document.querySelector(".content__name");
let trabajo = document.querySelector(".content__job");

let main = document.querySelector(".content");
let edit_button = document.querySelector(".content__edit-button");
let add_button = document.querySelector(".content__add-button");
let avatar_edit_button = document.querySelector(".content__avatar-edit");

API.load_user_info().then((result) => {
  nombre.textContent = result.name;
  trabajo.textContent = result.about;
  avatar.src = result.avatar;
});

let gallery;
API.get_cards().then((result) => {
  gallery = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = new Card(item.link, item.name, item._id, item.isLiked);

        gallery.add_Item(card.element);
      },
    },
    ".content__gallery-grid"
  );

  gallery.renderer();
});

edit_button.addEventListener("click", () => {
  const form = new PopupWithForm("#form-info");
});
add_button.addEventListener("click", () => {
  const form = new PopupWithForm("#form-add", (card) => {
    API.add_card(card).then((res) => {
      card.id = res._id;
      gallery.add_Item(card.element);
    });
  });
});
avatar_edit_button.addEventListener("click", () => {
  const form = new PopupWithForm("#form-change-picture");
});
