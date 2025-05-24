import { openPopUp, closePopUp } from "./modal"
import { createCard, deleteCard, likeCard } from "./card"
import {enableValidation, clearValidation} from "./validation"
import { getCards, getUser, patchUser, sendCard,changeAvatar } from "./api"
const profileButton = document.querySelector('.profile__edit-button')
// @todo: DOM узлы
const cardList = document.querySelector('.places__list')
const editPopUp = document.querySelector('.popup_type_edit')
const addProfile = document.querySelector('.profile__add-button')
const addPopUp = document.querySelector('.popup_type_new-card')
const imagePopUp = document.querySelector('.popup_type_image')
const modalImage = imagePopUp.querySelector('.popup__image')
const profileName = document.querySelector('.profile__title')
const profileOccupation = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const avatarPopUp = document.querySelector('.popup_type_avatar')
const profileForm = document.forms['edit-profile']
const mestoForm = document.forms['new-place']
const avatarForm = document.forms['new-avatar']
const caption = document.querySelector('.popup__caption')

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу

Promise.all ([getUser(), getCards()]).then(results=>{
    if(results[0]){
        setUserData(results[0])
    }
    if(results[1]){
        results[1].forEach(card=>{
            const isOwner = results[0]._id === card.owner._id ? true : false
            cardList.append(createCard(card, deleteCard, likeCard, showImage, isOwner))
        })
    }
})

profileButton.addEventListener('click', handleProfileButton)
addProfile.addEventListener('click', hanleAddProfile)
profileAvatar.addEventListener('click', handleAvatar)
document.addEventListener('click', handlePopUpClose)
profileForm.addEventListener('submit', handleProfileFormSubmit)
mestoForm.addEventListener('submit', handleMestoFormSubmit)
avatarForm.addEventListener('submit', handleAvatarSubmit)

function handleProfileButton () {
    openPopUp(editPopUp)
    profileForm.name.value = profileName.textContent
    profileForm.description.value = profileOccupation.textContent
    profileForm.name.dispatchEvent(new Event('input', { bubbles: true }))
    profileForm.description.dispatchEvent(new Event('input', { bubbles: true }))
}

function hanleAddProfile () {
    openPopUp(addPopUp)
}

function handleAvatar (e) {
    openPopUp(avatarPopUp)
}

function handlePopUpClose (e) {
    if(!(e.target.classList.contains('popup') || e.target.classList.contains('popup__close'))){return}
    const popupElement = e.target.closest('.popup')
    closePopUp(popupElement)
    const form = popupElement.querySelector('.popup__form')
    if(form){
        document.forms[form.getAttribute('name')].reset()
    }
    clearValidation(popupElement.querySelector('.popup__form'), {
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        submitButtonSelector: '.popup__button',
    })
}

function handleProfileFormSubmit (e){
    e.preventDefault()
    const sbmBtn = e.target.querySelector('.popup__button')
    sbmBtn.textContent = "Сохранение..."
    patchUser(profileForm.name.value, profileForm.description.value)
    .then(res=>{
        profileName.textContent = res.name
        profileOccupation.textContent = res.about
        sbmBtn.textContent = "Сохранить"
        closePopUp(editPopUp)
        clearValidation(editPopUp.querySelector('.popup__form'), {
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible',
            submitButtonSelector: '.popup__button',
        } )
    })
}

function handleMestoFormSubmit (e){
    e.preventDefault()
    const card = {
        name: e.target['place-name'].value,
        link: e.target['link'].value
    }
    const sbmtBtn = e.target.querySelector('[type="submit"]')
    sbmtBtn.textContent = 'Сохранение...'
    sendCard(card).then(res=>{
        if(res){
            cardList.prepend(createCard(res, deleteCard, likeCard, showImage, true))
            sbmtBtn.textContent = 'Сохранить'
            closePopUp(addPopUp)
            clearValidation(addPopUp.querySelector('.popup__form'), {
                inactiveButtonClass: 'popup__button_disabled',
                inputErrorClass: 'popup__input_type_error',
                errorClass: 'popup__error_visible',
                submitButtonSelector: '.popup__button',
            } )
        }
    })
}

function handleAvatarSubmit (e){
    e.preventDefault()
    const sbmtBtn = e.target.querySelector('[type="submit"]')
    sbmtBtn.textContent = 'Сохранение...'
    changeAvatar(e.target['avatar_link'].value).then(res=>{
        if(res){
            profileAvatar.style.backgroundImage = `url(${res.avatar})`
            closePopUp(avatarPopUp)
            clearValidation(popupElement.querySelector('.popup__form'), {
                inactiveButtonClass: 'popup__button_disabled',
                inputErrorClass: 'popup__input_type_error',
                errorClass: 'popup__error_visible',
                submitButtonSelector: '.popup__button',
            })
            sbmtBtn.textContent = 'Сохранить'
        }
    })
}

function showImage (e) {
    const alt = e.target.alt || e.target.closest('.card').querySelector('.card__title').textContent;
    modalImage.alt = alt;
    caption.textContent = alt;
    (modalImage.src = e.target.src) && openPopUp(imagePopUp) 
}

function setUserData (user) {
    profileAvatar.style.backgroundImage = `url(${user.avatar})`
    profileName.textContent = user.name
    profileOccupation.textContent = user.about
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 