export default class FormValidator {
  constructor(elementFields, button) {
    this.elementFields = elementFields;
    this.button = button;
  }
  _showError(input, error, button) {
    error.textContent = input.validationMessage;
    input.classList.add("form__field-error");
  }

  _hideError(input, error, button) {
    error.textContent = null;
    input.classList.remove("form__field-error");
  }

  _checkInputValidity(input, error, button) {
    if (input.validity.valid) {
      this._hideError(input, error, button);
    } else {
      this._showError(input, error, button);
    }
  }

  _setEventListeners(elementFields, button) {
    Array.from(elementFields).forEach((input) => {
      const error = document.querySelector(`.${input.id}-error`);
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(input, error, button);
        this._toggleButtonState(Array.from(elementFields), button);
      });
    });
  }
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.src = "./images/Submit Button cancelled.png";
      button.classList.remove("button-active");
      button.classList.remove("button-state-change");
    } else {
      button.src = "./images/Submit Button.png";
      button.classList.add("button-active");
      button.classList.add("button-state-change");
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._setEventListeners(this.elementFields, this.button);
  }
}
