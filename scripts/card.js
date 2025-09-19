export default class Card {
  constructor(url, name) {
    this.url = url;
    this.name = name;
  }
  create() {
    let page = document.querySelector(".page");
    let gallery = document.querySelector(".content__gallery-grid");
    let photoTemplate = document.querySelector("#photo-item").content;
    let photoElement = photoTemplate
      .querySelector(".content__foto-item")
      .cloneNode(true);
    photoElement.querySelector(".content__photo-tag-name").textContent =
      this.name;
    photoElement.querySelector(".content__foto").src = this.url;
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
        let fullviewTemplate =
          document.querySelector("#image-fullview").content;
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
  static innit() {
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
    initialCards.forEach(function (card) {
      const new_card = new Card(card["link"], card["name"]);
      new_card.create();
    });
  }
}
