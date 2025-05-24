function clearValidation (profileForm, validationConfig) {
    const inputClass = validationConfig?.inputSelector ?? '.popup__input'
    if(!profileForm){return}
    const formInputs = profileForm.querySelectorAll(inputClass)
    if(formInputs.length === 0){return}
    const errorSpanClass = validationConfig.errorClass ? `.${validationConfig.errorClass}` : '.popup__error_visible'
    const submitBtnClass = validationConfig?.submitButtonSelector ?? '.popup__button'
    const btnDisableClass= validationConfig?.inactiveButtonClass ?? '.popup__button_disabled'
    if(formInputs.length > 0){
        for(let formInput of formInputs){
            formInput.classList.remove('popup__input_type_error')
        }
    }
    let formErrorSpans = profileForm.querySelectorAll(errorSpanClass)
    if(formErrorSpans.length > 0){
        for(let formErrorSpan of formErrorSpans){
            formErrorSpan.classList.remove('popup__error_visible')
        }
    }
    const formBtns = profileForm.querySelectorAll(submitBtnClass)
    if(formBtns.length > 0){
        for(let formBtn of formBtns) {
            formBtn.classList.add(btnDisableClass)
        }
    }
}

function showInputError (form, input, errorMessage) {
    const errorSpan = form.querySelector(`#${input.name}-error`)
    errorSpan.classList.add('popup__error_visible')
    form.querySelector(`[name="${input.name}"]`).classList.add('popup__input_type_error')
    errorSpan.textContent = errorMessage
}

function hideInpputError (form, input) {
    form.querySelector(`#${input.name}-error`).classList.remove('popup__error_visible')
    form.querySelector(`[name="${input.name}"]`).classList.remove('popup__input_type_error')
}

function checkValidity (form, input, validationOptions) {
    const errorClasses = {
        errorClass: validationOptions.errorClass ?? 'popup__error_visible',
        inputErrorClass: validationOptions.inputErrorClass ?? 'popup__input_type_error'
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
    const inputClass = validationOptions.inputSelector || '.popup__input'
    const inputList = Array.from(form.querySelectorAll(inputClass));
    const buttonElementClass = validationOptions.submitButtonSelector ?? '.popup__button'
    const buttonElement = form.querySelector(buttonElementClass)
    const buttonInactiveClass = validationOptions.inactiveButtonClass ?? 'popup__button_disabled'
    toggleButtonState(inputList, buttonElement, buttonInactiveClass);
    const inputs = form.querySelectorAll('.popup__input')
    for(let input of inputs){
        input.addEventListener('input', ()=>{
            checkValidity(form, input, validationOptions)
            toggleButtonState(inputList, buttonElement, buttonInactiveClass)
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
        if(e.target.classList.contains(options.inactiveButtonClass || 'popup__button_disabled')){
            e.preventDefault()
        }
    })
}



export {clearValidation, enableValidation}
