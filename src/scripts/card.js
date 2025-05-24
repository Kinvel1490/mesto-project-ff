import { removeCard, toggleLikes } from "./api"

const cardTemplate = document.querySelector("#card-template").content.querySelector('.card')
function createCard (cardData, deleteCallback, likeCallback, imageCallback, isOwner) {
    const card = cardTemplate.cloneNode(true)
    card.id = cardData._id
    const image = card.querySelector('.card__image')
    image.src = cardData.link
    image.alt = cardData.name
    card.querySelector('.card__title').innerText = cardData.name
    card.querySelector('.card__like-count').innerText = cardData.likes.length
    const deleteButton = card.querySelector('.card__delete-button')
    isOwner ? deleteButton.addEventListener('click', deleteCallback) : deleteButton.remove()
    card.querySelector('.card__like-button').addEventListener('click', likeCallback)
    image.addEventListener('click', imageCallback)
    return card
}
// @todo: Функция удаления карточки
function deleteCard (e) {
    const card = e.target.closest('.card')
    removeCard(card.id).then(res=>{
        card.remove()
    })
}

function likeCard (e) {
    const sendMethod = e.target.classList.contains('card__like-button_is-active') ? 'delete' : 'put'
    const card = e.target.closest('.card')
    toggleLikes(sendMethod, card.id)
    .then(res=>{
        if(res){
            e.target.classList.toggle('card__like-button_is-active')
            card.querySelector('.card__like-count').innerText = res.likes.length
        }
    })
}

export {createCard, deleteCard, likeCard}