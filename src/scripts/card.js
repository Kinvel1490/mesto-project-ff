const cardTemplate = document.querySelector("#card-template").content.querySelector('.card')
function createCard (cardData, deleteCallback, likeCallback, imageCallback) {
    const card = cardTemplate.cloneNode(true)
    const image = card.querySelector('.card__image')
    image.src = cardData.link
    image.alt = cardData.name
    card.querySelector('.card__title').innerText = cardData.name
    card.querySelector('.card__delete-button').addEventListener('click', deleteCallback)
    card.querySelector('.card__like-button').addEventListener('click', likeCallback)
    image.addEventListener('click', imageCallback)
    return card
}
// @todo: Функция удаления карточки
function deleteCard (e) {
    e.target.closest('.card').remove()
}

function likeCard (e) {
    e.target.classList.toggle('card__like-button_is-active')
}

export {createCard, deleteCard, likeCard}