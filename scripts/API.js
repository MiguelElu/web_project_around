export default class API {
  static like_toogle(evt, id) {
    if (evt.target.src.includes("/images/like.png")) {
      fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${id}/likes`,
        {
          method: "PUT",
          headers: {
            authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
          },
        }
      ).then((res) => {
        evt.target.src = "./images/like_active.png";
      });
    } else {
      fetch(
        `https://around-api.es.tripleten-services.com/v1/cards/${id}/likes`,
        {
          method: "DELETE",
          headers: {
            authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
          },
        }
      ).then((res) => {
        evt.target.src = "./images/like.png";
      });
    }
  }
  static delete_photo(id, element, form) {
    fetch(`https://around-api.es.tripleten-services.com/v1/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
      },
    }).then((res) => {
      element.remove();
      form.close();
    });
  }

  static load_user_info() {
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
      },
    }).then((res) => {
      return res.json();
    });
  }

  static get_cards() {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
      },
    }).then((res) => {
      return res.json();
    });
  }

  static add_card(card) {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      method: "POST",
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: card.url,
        name: card.name,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  static update_info(values) {
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values[0],
        about: values[1],
      }),
    });
  }

  static change_picture(form) {
    fetch("https://around-api.es.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "7ac7e9c4-580f-4541-8c1d-d6fc3910f799",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: form._getInputValues()[0],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        document.querySelector(".content__avatar").src = res.avatar;
        form.close();
      });
  }
}
