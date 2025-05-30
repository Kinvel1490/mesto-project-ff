
const config = {
  headers: {
    authorization: '5f80f61b-c737-4a1a-9ed2-65ea2c8c84f5',
    'Content-Type': 'application/json'
  },
  base: 'https://nomoreparties.co/v1/wff-cohort-39'
}


function getCards () {
    return fetch(`${config.base}/cards`, config)
        .then(res => {
            return checkPromiseStatus(res)
        })
}

function getUser () {
    return fetch(`${config.base}/users/me`, config)
    .then(
        res => {
            return checkPromiseStatus(res)
        }
    )
}

function sendCard (card) {
    config.method = 'POST'
    config.body = JSON.stringify({
        name: card.name,
        link: card.link
    })
    return fetch(`${config.base}/cards`, config)
    .then(
        res => {
            return checkPromiseStatus(res)
        }
    )
}

function removeCard (cardId) {
    config.method = 'DELETE'
    return fetch(`${config.base}/cards/${cardId}`, config)
    .then(res=>{
        return checkPromiseStatus(res)
    })
}

function patchUser (name, about) {
    config.method = 'PATCH'
    config.body = JSON.stringify({
        name: name,
        about: about
    })
    return fetch(`${config.base}/users/me`, config)
    .then(res=>{
        return checkPromiseStatus(res)
    })
}

function toggleLikes (sendMethod, cardId) {
    config.method = sendMethod.toUpperCase()
    return fetch(`${config.base}/cards/likes/${cardId}`, config)
    .then(res=>{
        return checkPromiseStatus(res)
    })
}

function changeAvatar(avatarURL) {
    config.method = 'PATCH'
    config.body = JSON.stringify({
        avatar: avatarURL
    })
    return fetch(`${config.base}/users/me/avatar`, config)
    .then(res=>{
        return checkPromiseStatus(res)
    })
}

function checkPromiseStatus (prom) {
    if (prom.ok) {
        return prom.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}


export {getCards, getUser, patchUser, sendCard, removeCard, toggleLikes, changeAvatar}