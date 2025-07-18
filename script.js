let form = document.querySelector(".form");
let close_button = document.querySelector(".form__cancel-button");
let edit_button = document.querySelector(".content__edit-button");
let profile = document.querySelector(".content__profile-info");
let save_button = document.querySelector(".form__button");
let nombre = document.querySelector(".content__name");
let trabajo = document.querySelector(".content__job");
let form_data = document.querySelector(".form__fields");

function init_form() {
  form.classList.toggle("form__hide");
  form_data.innerHTML = `
  <input class="form__field" type="text" value="${nombre.textContent}" />
  <input class="form__field" type="text" value="${trabajo.textContent}" />
  `;
}

function save_changes() {
  let new_data = document.querySelectorAll(".form__field");

  nombre.innerHTML = `${new_data[0].value}`;
  trabajo.innerHTML = `${new_data[1].value}`;
  console.log(new_data[0].value);

  form.classList.toggle("form__hide");
}

close_button.addEventListener("click", init_form);
edit_button.addEventListener("click", init_form);
save_button.addEventListener("click", save_changes);
