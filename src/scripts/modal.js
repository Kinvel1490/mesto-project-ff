function closePopUp (element) {
    element.classList.remove('popup_is-opened')
    let inputs = element.querySelectorAll('input')
    if(!inputs) return
    for(let input of inputs) {
        input.value = ''
    }
}

function openPopUp (element) {
    element.classList.add('popup_is-opened')
}

export {openPopUp, closePopUp}