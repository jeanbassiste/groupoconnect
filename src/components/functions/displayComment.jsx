import deletingComment from "./deleteComment";
import editingComment from "./editComment";

function displayComment(comment, userId) {

    let article = document.createElement('article');
    article.setAttribute('id', 'comment');

    let commentAuthor = document.createElement('div');
    commentAuthor.setAttribute('id', 'commentAuthor');

    let photo = document.createElement('img');
    photo.setAttribute('src', `{user}`);
    photo.setAttribute('id', 'authorPic');
    photo.setAttribute('alt', " ");
    commentAuthor.appendChild(photo);
    article.appendChild(commentAuthor);

    let commentContent = document.createElement('div');
    commentContent.setAttribute('id', 'commentAuthor');

    let authorC = document.createElement('p');
    authorC.setAttribute('id', 'authorC');
    authorC.innerText = `${comment.user.firstName} ${comment.user.lastName}`;
    commentContent.appendChild(authorC);
    
    let commentText = document.createElement('p');
    commentText.setAttribute('id', 'commentText');
    commentText.innerText = `${comment.text}`;
    commentContent.appendChild(commentText);
    
    article.appendChild(commentContent);

    if(userId === comment.user.id) {
        let deleteComment = document.createElement('p');
        deleteComment.setAttribute('class', 'modifier');
        deleteComment.innerText = 'Supprimer';
        let editComment = document.createElement('p');
        editComment.setAttribute('class', 'modifier');
        editComment.innerText = 'Modifier';
        article.appendChild(deleteComment);
        article.appendChild(editComment);

        deleteComment.addEventListener('click', () => deletingComment(comment.id));
        editComment.addEventListener('click', () => editingComment(comment.id, comment.text, commentText, commentContent));
    }

    document.getElementById('commentSection').appendChild(article);

}

export default displayComment;