// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector('.card')
// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard (cardData, buttonCalback) {
    const card = cardTemplate.cloneNode(true)
    card.querySelector('.card__image').src = cardData.link
    card.querySelector('.card__image').alt = cardData.name
    card.querySelector('.card__title').innerText = cardData.name
    card.querySelector('.card__delete-button').addEventListener('click', buttonCalback)
    return card
}
// @todo: Функция удаления карточки
function deleteCard (e) {
    e.target.closest('.card').remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(c=>{cardList.append(createCard(c, deleteCard))})