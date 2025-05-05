import initialCards from "./cards"
import { openPopUp, closePopUp } from "./modal"
import { createCard, deleteCard, likeCard } from "./card"
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
const profileForm = document.forms['edit-profile']
const mestoForm = document.forms['new-place']

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(card=>{cardList.append(createCard(card, deleteCard, likeCard, showImage))})

profileButton.addEventListener('click', handleProfileButton)
addProfile.addEventListener('click', hanleAddProfile)
document.addEventListener('click', handlePopUpClose)
profileForm.addEventListener('submit', handleProfileFormSubmit)
mestoForm.addEventListener('submit', handleMestoFormSubmit)

function handleProfileButton () {
    openPopUp(editPopUp)
    profileForm.name.value = profileName.textContent
    profileForm.description.value = profileOccupation.textContent
}

function hanleAddProfile () {
    openPopUp(addPopUp)
}

function handlePopUpClose (e) {
    (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) && 
        closePopUp(e.target.closest('.popup'))
}

function handleProfileFormSubmit (e){
    e.preventDefault()
    profileName.textContent = profileForm.name.value
    profileOccupation.textContent = profileForm.description.value
    closePopUp(editPopUp)
    profileForm.reset()
}

function handleMestoFormSubmit (e){
    e.preventDefault()
    const card = {
        name: e.target['place-name'].value,
        link: e.target['link'].value
    }
    cardList.prepend(createCard(card, deleteCard, likeCard, showImage))
    closePopUp(addPopUp)
    mestoForm.reset()
}

function showImage (e) {
    const alt = e.target.alt || e.target.closest('.card').querySelector('.card__title').textContent;
    modalImage.alt = alt;
    document.querySelector('.popup__caption').textContent = alt;
    (modalImage.src = e.target.src) && openPopUp(imagePopUp) 
}