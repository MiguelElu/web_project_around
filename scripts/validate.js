const showError = (input, error, button) => {
  // añadir la clase de error al elemento de entrada
  error.textContent = input.validationMessage;
  input.classList.add("form__field-error");
};

const hideError = (input, error, button) => {
  error.textContent = null;
  input.classList.remove("form__field-error");
};

const checkInputValidity = (input, error, button) => {
  if (input.validity.valid) {
    hideError(input, error, button);
  } else {
    showError(input, error, button);
  }
};

const setEventListeners = (elementFields, button) => {
  Array.from(elementFields).forEach((input) => {
    const error = document.querySelector(`.${input.id}-error`);
    console.log(error);
    input.addEventListener("input", function (evt) {
      checkInputValidity(input, error, button);
      toggleButtonState(Array.from(elementFields), button);
    });
  });
};
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.src = "./images/Submit Button cancelled.png";
    button.classList.remove("button-active");
    button.classList.remove("button-state-change");
  } else {
    button.src = "./images/Submit Button.png";
    button.classList.add("button-active");
    button.classList.add("button-state-change");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function enableValidation() {
  let elementFields = document.querySelectorAll(".form__field");
  let button = document.querySelector(".form__button");
  setEventListeners(elementFields, button);
}

edit_button.addEventListener("click", () => enableValidation());
add_button.addEventListener("click", () => enableValidation());
