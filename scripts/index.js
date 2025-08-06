let form = document.querySelector(".form");
let edit_button = document.querySelector(".content__edit-button");
let add_button = document.querySelector(".content__add-button");
let profile = document.querySelector(".content__profile-info");
let nombre = document.querySelector(".content__name");
let trabajo = document.querySelector(".content__job");
let gallery = document.querySelector(".content__gallery-grid");
let main = document.querySelector(".content");
let page = document.querySelector(".page");
let counter = false;
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createImage(url, name) {
  let photoTemplate = document.querySelector("#photo-item").content;
  let photoElement = photoTemplate
    .querySelector(".content__foto-item")
    .cloneNode(true);
  photoElement.querySelector(".content__photo-tag-name").textContent = name;
  photoElement.querySelector(".content__foto").src = url;
  photoElement.querySelector(".content__foto").alt = "Foto de paisaje";
  photoElement
    .querySelector(".content__like")
    .addEventListener("click", function (evt) {
      if (evt.target.src.includes("/images/like.png")) {
        evt.target.src = "./images/like_active.png";
      } else {
        evt.target.src = "./images/like.png";
      }
    });
  photoElement
    .querySelector(".content__trash-icon")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.parentElement.remove();
    });
  photoElement
    .querySelector(".content__foto")
    .addEventListener("click", function (evt) {
      let fullviewTemplate = document.querySelector("#image-fullview").content;
      let fullviewElement = fullviewTemplate
        .querySelector(".fullview")
        .cloneNode(true);
      fullviewElement.querySelector(".fullview__image").src = evt.target.src;

      fullviewElement
        .querySelector(".fullview__cancel-button")
        .addEventListener("click", (evt) => {
          evt.target.parentElement.parentElement.remove();
        });
      page.prepend(fullviewElement);
    });
  gallery.append(photoElement);
}

initialCards.forEach(function (card) {
  createImage(card["link"], card["name"]);
});

function openForm(type) {
  let formTemplate = document.querySelector("#form").content;
  let formElement = formTemplate.querySelector(".form").cloneNode(true);
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
    formElement.querySelector(".form__title").textContent = "Nuevo lugar";
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
          createImage(elementFields[1].value, elementFields[0].value);
          evt.target.parentElement.parentElement.remove();
        }
      });
  }

  formElement
    .querySelector(".form__cancel-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.parentElement.remove();
    });

  main.append(formElement);
}

function save_changes() {
  let new_data = document.querySelectorAll(".form__field");

  nombre.innerHTML = `${new_data[0].value}`;
  trabajo.innerHTML = `${new_data[1].value}`;
}

edit_button.addEventListener("click", () => openForm("Edit"));
add_button.addEventListener("click", () => openForm("Add"));
page.addEventListener("click", function (evt) {
  let form = document.querySelector(".form");
  let fullview = document.querySelector(".fullview");
  if (
    form &&
    !Array.from(evt.target.classList).some((cls) => cls.includes("form")) &&
    counter
  ) {
    form.remove();
    counter = !counter;
  }
  if (
    fullview &&
    !Array.from(evt.target.classList).some((cls) => cls.includes("image")) &&
    counter
  ) {
    fullview.remove();
    counter = !counter;
  }
  if (
    Array.from(evt.target.classList).some((cls) =>
      cls.includes("button-state-change")
    ) ||
    Array.from(evt.target.classList).some((cls) => cls.includes("foto"))
  ) {
    counter = !counter;
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    // Close form or fullview if open
    let form = document.querySelector(".form");
    let fullview = document.querySelector(".fullview");
    if (form) {
      form.remove();
      counter = !counter;
    }
    if (fullview) {
      fullview.remove();
      counter = !counter;
    }
  }
});
