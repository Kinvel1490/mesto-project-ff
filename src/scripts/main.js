import initialCards from "./cards"
import { openPopUp, closePopUp } from "./modal"
import { createCard, deleteCard, showImage, likeCard } from "./card"
(function (){// @todo: Темплейт карточки
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

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(c=>{cardList.append(createCard(c, deleteCard, likeCard, showImage.bind(null, imagePopUp, modalImage, openPopUp)))})

profileButton.addEventListener('click', ()=>{
    openPopUp(editPopUp)
    profileForm.name.value = profileName.textContent
    profileForm.description.value = profileOccupation.textContent
})

addProfile.addEventListener('click', ()=>{
    openPopUp(addPopUp)
})

document.addEventListener('click', e=>{
    (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) && closePopUp(e.target.closest('.popup'))
})

profileForm.addEventListener('submit', e=>{
    e.preventDefault()
    profileName.textContent = profileForm.name.value
    profileOccupation.textContent = profileForm.description.value
    closePopUp(editPopUp)
})

document.forms['new-place'].addEventListener('submit', e=>{
    e.preventDefault()
    let card = {
        name: e.target['place-name'].value,
        link: e.target['link'].value
    }
    cardList.prepend(createCard(card, deleteCard, likeCard, (e)=>showImage(e, imagePopUp, modalImage, openPopUp)))
    closePopUp(addPopUp)
})

}())