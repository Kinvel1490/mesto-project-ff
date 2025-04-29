const cardTemplate = document.querySelector("#card-template").content.querySelector('.card')
function createCard (cardData, deleteCallback, likeCallback, imageCallback) {
    const card = cardTemplate.cloneNode(true)
    card.querySelector('.card__image').src = cardData.link
    card.querySelector('.card__image').alt = cardData.name
    card.querySelector('.card__title').innerText = cardData.name
    card.querySelector('.card__delete-button').addEventListener('click', deleteCallback)
    card.querySelector('.card__like-button').addEventListener('click', likeCallback)
    card.querySelector('.card__image').addEventListener('click', imageCallback)
    return card
}
// @todo: Функция удаления карточки
function deleteCard (e) {
    e.target.closest('.card').remove()
}

function likeCard (e) {
    e.target.classList.toggle('card__like-button_is-active')
}

function showImage (modal, image, showCallback, e) {
    (image.src = e.target.src) && showCallback(modal)
}

export {createCard, deleteCard, likeCard, showImage}