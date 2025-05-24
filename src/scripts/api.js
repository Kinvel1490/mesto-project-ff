
const config = {
  headers: {
    authorization: '5f80f61b-c737-4a1a-9ed2-65ea2c8c84f5',
    'Content-Type': 'application/json'
  }
}


async function getCards () {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', config)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function getUser () {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me ', config)
    .then(
        res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    ).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function sendCard (card) {
    config.method = 'POST'
    config.body = JSON.stringify({
        name: card.name,
        link: card.link
    })
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards ', config)
    .then(
        res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    ).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function removeCard (cardId) {
    config.method = 'DELETE'
    return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, config)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function patchUser (name, about) {
    config.method = 'PATCH'
    config.body = JSON.stringify({
        name: name,
        about: about
    })
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', config)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function toggleLikes (sendMethod, cardId) {
    config.method = sendMethod.toUpperCase()
    return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, config)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

async function changeAvatar(avatarURL) {
    config.method = 'PATCH'
    config.body = JSON.stringify({
        avatar: avatarURL
    })
    return fetch(`https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar`, config)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}



export {getCards, getUser, patchUser, sendCard, removeCard, toggleLikes, changeAvatar}