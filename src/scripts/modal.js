function closePopUp (element) {
    element.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeOnEsc)
}

function openPopUp (element) {
    element.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeOnEsc)
}

function closeOnEsc (e) {
    const popUp = document.querySelector('.popup_is-opened')
    if(e.key == 'Escape'){
        closePopUp(popUp)
    }
}

export {openPopUp, closePopUp}