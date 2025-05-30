function clearValidation (profileForm, validationConfig) {
    if(!profileForm){return}
    const formInputs = profileForm.querySelectorAll(validationConfig.inputSelector)
    if(formInputs.length === 0){return}
    if(formInputs.length > 0){
        for(let formInput of formInputs){
            formInput.classList.remove(validationConfig.inputErrorClass)
        }
    }
    let formErrorSpans = profileForm.querySelectorAll(`.${validationConfig.errorClass}`)
    if(formErrorSpans.length > 0){
        for(let formErrorSpan of formErrorSpans){
            formErrorSpan.classList.remove(validationConfig.errorClass)
        }
    }
    const formBtns = profileForm.querySelectorAll(validationConfig.submitButtonSelector)
    if(formBtns.length > 0){
        for(let formBtn of formBtns) {
            formBtn.classList.add(validationConfig.inactiveButtonClass)
        }
    }
}

function showInputError (form, input, errorMessage, errorClasses) {
    const errorSpan = form.querySelector(`#${input.name}-error`)
    errorSpan.classList.add(errorClasses.errorClass)
    form.querySelector(`[name="${input.name}"]`).classList.add(errorClasses.inputErrorClass)
    errorSpan.textContent = errorMessage
}

function hideInpputError (form, input, errorClasses) {
    form.querySelector(`#${input.name}-error`).classList.remove(errorClasses.errorClass)
    form.querySelector(`[name="${input.name}"]`).classList.remove(errorClasses.inputErrorClass)
}

function checkValidity (form, input, validationOptions) {
    const errorClasses = {
        errorClass: validationOptions.errorClass,
        inputErrorClass: validationOptions.inputErrorClass
    }
    if(input.name === 'name' || input.name === 'place-name') {
        const regExp = /[^a-zа-яё^\s^-]/ig
        if (regExp.test(input.value)) {
            showInputError(form, input, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы", errorClasses);
        } else {
            hideInpputError(form, input, errorClasses);
        }
    } else {
        if (!input.validity.valid) {
            showInputError(form, input, input.validationMessage, errorClasses);
        } else {
            hideInpputError(form, input, errorClasses);
        }
    }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement, buttonInactiveClass) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(buttonInactiveClass)
  } else {
    buttonElement.classList.remove(buttonInactiveClass)
  }
}

function setEventListeners (form, validationOptions) {
    const inputList = Array.from(form.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = form.querySelector(validationOptions.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, validationOptions.inactiveButtonClass);
    const inputs = form.querySelectorAll(validationOptions.inputSelector)
    for(let input of inputs){
        input.addEventListener('input', ()=>{
            checkValidity(form, input, validationOptions)
            toggleButtonState(inputList, buttonElement, validationOptions.inactiveButtonClass)
        })
    }
}

function enableValidation (options) {
    options = options ?? {};
    if(typeof(options === 'object' && !Array.isArray(options))){
        if(Object.keys(options).length === 0) {return false}
    }
    const popupClass = options.formSelector ? '.popup__form' : options.formSelector
    const forms = document.querySelectorAll(popupClass)
    for(let form of forms){
        form.addEventListener('submit', e=>{e.preventDefault()})
        setEventListeners(form, options)
        clearValidation(form, options)
    }
    document.addEventListener('click', e=>{
        if(e.target.classList.contains(options.inactiveButtonClass)){
            e.preventDefault()
        }
    })
}



export {clearValidation, enableValidation}
