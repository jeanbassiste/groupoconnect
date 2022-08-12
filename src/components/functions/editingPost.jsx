import axios from "axios";
import getCookie from "./getCookie";
import jwt_decode from "jwt-decode";

function editingPost(post, header, body, title, content, titleText, contentText, headers) {    
    let userId = jwt_decode(getCookie('token')).id;

    title.style.display = 'none';
    content.style.display = 'none';

    let newTitle = document.createElement('input');
    newTitle.setAttribute('type', 'text');
    newTitle.setAttribute('type', 'editedTitle');
    newTitle.setAttribute('id', 'editedTitle');
    newTitle.value = `${titleText}`;
    header.appendChild(newTitle);

    let newContent = document.createElement('input');
    newContent.setAttribute('type', 'text');
    newContent.setAttribute('type', 'editedContent');
    newContent.setAttribute('id', 'editedContent');
    newContent.value = `${contentText}`;
    body.appendChild(newContent);

    let button = document.createElement('button');
    button.setAttribute('id', 'editPost');
    button.setAttribute('type', 'button');
    button.innerText = 'Modifier le post';
    body.appendChild(button);

    button.addEventListener('click', () => {
        let editedTitle = document.getElementById('editedTitle').value;
        let editedContent = document.getElementById('editedContent').value;
        console.log(post);

        let token = getCookie('token');

        let body =         { 
            id: userId, 
            title : editedTitle,          
            text: editedContent
        }

        axios.put(`http://localhost:8080/api/posts/${post}`, {body}, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
        })
    })
}

export default editingPost;