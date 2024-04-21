const commentsList = [
    {
        image: "./assets/images/profile1.png",
        name: "Emily Fray",
        text: "Really cool! ✌ I love it!🌏",
        replays: [],
        likes: 2,
        date: '1d'
    },
    {
        image: "./assets/images/profile2.png",
        name: "Esther Howard",
        text: "I would also love to visit there! The best place for me. Will definitely go back there again with my family ☘💕 ",
        replays: [],
        date: '2d'
    },
]

const commentsListElement = document.getElementById('commentsList')
const commentInput = document.getElementById('commentInput')
const postCommentsCount = document.getElementById('postComments').querySelector('span')

postCommentsCount.textContent = commentsList.length

commentInput.addEventListener('keypress', (e) => {
    if(e.key !== 'Enter') return

    const comment = {
        name: "No Name",
        text: e.target.value,
        date: "Today"
    }

    commentsList.push(comment)
    addCommentToPost(comment)
    postCommentsCount.textContent = commentsList.length

    commentInput.value = ''
});

function addCommentToPost(comment){
    const {image, name, text, replays, likes, date} = comment

    const commentItem = document.createElement('div')
    commentItem.classList.add("commentItem")

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

    const controls = `
    <div class="controls">
        <span class="likes controlsTextContent">
            <img class="iconHearth clickableItem" src="./assets/icons/hearthGrey.svg" alt="like">
            ${likes || ''}
        </span>
        <span class="replay controlsTextContent">
            <img onclick="hello()" class="clickableItem" src="./assets/icons/reply.svg" alt="reply">
            ${replays?.length || ''}
        </span>
    </div>
    `

    function hello(){
        console.log('hello')
    }

    commentData.appendChild(commentAuthorName)
    commentData.appendChild(commentText)
    commentData.innerHTML += controls

    commentItem.appendChild(commentAuthorImage)
    commentItem.appendChild(commentData)
    commentItem.appendChild(commentDate)

    commentsListElement.appendChild(commentItem)
}


commentsList.forEach( comment => {
    addCommentToPost(comment)
})
