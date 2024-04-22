const commentsList = [
    {
        image: "./assets/images/profile1.png",
        name: "Emily Fray",
        text: "Really cool! ✌ I love it!🌏",
        replys: [
            {
                image: "./assets/images/profile2.png",
                name: "Esther Howard",
                text: "I would also love to visit there! The best place for me. Will definitely go back there again with my family ☘💕 ",
                date: '2d'
            }
        ],
        likes: 2,
        date: '1d'
    },
    {
        image: "./assets/images/profile2.png",
        name: "Esther Howard",
        text: "I would also love to visit there! The best place for me. Will definitely go back there again with my family ☘💕 ",
        replys: [],
        date: '2d'
    },
]
const MAIN_COMMEN_CLASS = "mainComment"

const commentsListElement = document.getElementById('commentsList')
const commentInput = document.getElementById('commentInput')
const postCommentsCount = document.getElementById('postComments').querySelector('span')

let currentActiveReply = null

commentInput.addEventListener('keypress', inputKeyPress);

function inputKeyPress(e) {
    if(e.key !== 'Enter') return

    const comment = {
        name: "No Name",
        text: e.target.value,
        date: "Today",
        replys: []
    }

    if(currentActiveReply || currentActiveReply === 0){
        commentsList[currentActiveReply].replys.push(comment)
        renderAllComments()
    }else{
        commentsList.push(comment)
        addCommentToPost(commentsListElement, comment, commentsList.length - 1)
        postCommentsCount.textContent = getAllCommnetsCount()
    }

    commentInput.value = ''
    currentActiveReply = null
}

function getAllCommnetsCount(comments = commentsList){
    return comments.reduce((acc, curr) => acc + 1 + curr.replys?.length, 0)
}

function addCommentToPost(commentsList, comment, index, isReply){
    const {image, name, text, replys, likes, date} = comment

    const commentItem = document.createElement('div')
    commentItem.classList.add("commentItem") 
    isReply ? commentItem.classList.add("replyItem") : commentItem.classList.add(MAIN_COMMEN_CLASS) 

    const commentAuthorImage = document.createElement( image ? 'img' : 'div')
    commentAuthorImage.classList.add('commentAuthorImage')
    if(image){
        commentAuthorImage.src = image
    }else{
        commentAuthorImage.textContent = name[0]
    }

    const commentData = document.createElement('div')
    commentData.classList.add('commentData')

    const commentAuthorName = document.createElement('span') 
    commentAuthorName.classList.add('commentAuthorName')
    commentAuthorName.textContent = name

    const commentText = document.createElement('p')
    commentText.classList.add('commentText')
    commentText.textContent = text

    const commentDate = document.createElement('span')
    commentDate.classList.add('additionalInfo', 'commentDate')
    commentDate.textContent = date

    const replyButton = !isReply ? `
        <span class="replay controlsTextContent">
            <img onclick="replyComment(${index})" class="clickableItem" src="./assets/icons/reply.svg" alt="reply">
            ${replys?.length || ''}
        </span>
    ` : ''

    const controls = `
    <div class="controls">
        <span class="likes controlsTextContent">
            <img class="iconHearth clickableItem" src="./assets/icons/hearthGrey.svg" alt="like">
            ${likes || ''}
        </span>
        ${replyButton}
    </div>
    `

    commentData.appendChild(commentAuthorName)
    commentData.appendChild(commentText)
    commentData.innerHTML += controls

    commentItem.appendChild(commentAuthorImage)
    commentItem.appendChild(commentData)
    commentItem.appendChild(commentDate)

    replys?.forEach( reply => {
        addCommentToPost(commentItem, reply, 0, true)
    })

    commentsList.appendChild(commentItem)
}

function replyComment(index){

    currentActiveReply = index

    const currentItem = commentsListElement.querySelectorAll('.' + MAIN_COMMEN_CLASS)[index]

    currentItem.innerHTML += `
    <div onfocusout="this.remove()" class="commentInput replyItem">
        <div class="userCircle">
            N
        </div>
        <input class="input" placeholder="Reply here..." type="text">
    </div>
    `    
    const listOfReplyItems = currentItem.querySelectorAll('.replyItem')
    const input = listOfReplyItems[listOfReplyItems.length - 1].querySelector('input')
    input.addEventListener('keypress', inputKeyPress);
    input.focus()
    
}

function renderAllComments() {
    commentsListElement.replaceChildren();

    postCommentsCount.textContent = getAllCommnetsCount()
    commentsList.forEach( (comment, i) => {
        addCommentToPost(commentsListElement, comment, i)
    })
}

renderAllComments()