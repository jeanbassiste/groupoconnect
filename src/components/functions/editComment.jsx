import axios from "axios";

function editingComment(comment, texte, bloc, container) {
    console.log('modification du commentaire numéro ' + comment);
    console.log(texte);

    bloc.style.display = 'none';
    let form = document.createElement('form');
    let newComment = document.createElement('input');
    newComment.setAttribute('type', 'text');
    newComment.setAttribute('name', 'editedComment');
    newComment.setAttribute('id', 'test');
    newComment.setAttribute('placeholder', `${texte}`);
    form.appendChild(newComment);
    let button = document.createElement('button');
    button.setAttribute('id', 'editContet');
    button.setAttribute('type', 'button');
    button.innerText = 'Modifier le commentaire';
    form.appendChild(button);
    container.appendChild(form);

    let test = document.getElementById('test');
    console.log(test);
    let editedText = test.value;

    button.addEventListener('click', () => {
        console.log(test.value);
        axios.put(`http://localhost:8080/api/comments/${comment}`, {             
            text: test.value,
        })
        .then(res => {

            console.log('ça marche');

        })

    })

}

export default editingComment;