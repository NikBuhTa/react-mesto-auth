class FormValidator{

    constructor(info, form){
        this._inputSelector = info.inputSelector;
        this._submitButtonSelector = info.submitButtonSelector;
        this._inactiveButtonClass = info.inactiveButtonClass;
        this._inputErrorClass = info.inputErrorClass;
        this._errorClass = info._errorClass;
        this._form = form;
    }

    _showValidationError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    
    _hideValidationError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
    };
    
    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showValidationError(inputElement, inputElement.validationMessage);
        } else {
            this._hideValidationError(inputElement);
        }
    };
    
    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    resetValidation() {
        this._toggleButtonState();// <== управляем кнопкой ==
  
        this._inputList.forEach((inputElement) => {
          this._hideValidationError(inputElement) //<==очищаем ошибки ==
        });
  
      }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        };
    };

    enableValidation(){
        this._setEventListeners();
    }
}

export default FormValidator;