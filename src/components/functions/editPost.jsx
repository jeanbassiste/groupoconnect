import getCookie from './getCookie';
import axios from 'axios';

function editPost(postId, editedTitle, editedContent, userId, image, pic) {
    
    let fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ]

    function validFileType(file) {
        for(var i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
            return true;
            }
        }
        return false;
    }


    function updatePic(image){
        if(image === 0) {
            let error = document.createElement('p');
            error.textContent = 'Aucun fichier sélectionné';
        } else {
                if(validFileType(image)) {
                pic.src = window.URL.createObjectURL(image);
                return image;

            } else {
                console.log(validFileType(image));
                let error = document.createElement('p');
                error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                }   
            }       
    }
    const formData = new FormData();
    formData.append('title', editedTitle);
    formData.append('text', editedContent);
    formData.append('author', userId);
    if(image)
{    formData.append('image', updatePic(image));
}
    let token = getCookie('token');
       
    let url = `http://localhost:8080/api/posts/${postId.id}`

    axios.put(url, formData, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
    .then(
        window.location.reload()
    )
    };

export default editPost