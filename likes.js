const postLikes = document.getElementById('postLikes')

postLikes.addEventListener('click', (e) => {
    const ACTIVE_CLASS_NAME = 'active'

    const classList = postLikes.classList
    classList.toggle(ACTIVE_CLASS_NAME)

    const likesCount = Number(postLikes.textContent)

    if(classList.contains(ACTIVE_CLASS_NAME)){
        postLikes.querySelector('span').textContent = (likesCount || 0) + 1
        postLikes.childNodes[1].src = './assets/icons/hearthRed.svg'
    }else{
        postLikes.querySelector('span').textContent = (likesCount || 1) - 1
        postLikes.childNodes[1].src = './assets/icons/hearthGrey.svg'
    }
})