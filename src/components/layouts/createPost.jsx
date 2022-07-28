import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import upload from "../../assets/upload.jpg";

class CreatePost extends React.Component {
    render() {
        return (
            <div id='postCreatorBloc' className='col-lg-6 mx-auto py-3 d-flex justify-content-center'>
                <form id="createPost" className='col-lg-12 createPostForm flex-column align-items-start'>
                    <div id='tagContainer'>
                        <label htmlFor='postTag' className='d-none'>Choisissez votre catégorie</label>
                        <select name="tag" id='postTag'>
                            <option value="Annonce">Annonce</option>
                            <option value="RH">RH</option>
                            <option value="Trucs et astuces">Trucs et astuces</option>
                            <option value="Transport">Transport</option>
                            <option value="Fun">Fun</option>
                            <option value="Bonnes adresses">Bonnes adresses</option>
                            <option value="CSE et avantages">CSE et avantages</option>
                            <option value="Question">Question</option>
                            <option value="Divertissement">Divertissement</option>
                            <option value="Culture">Culture</option>
                        </select>                       
                    </div>
                    <div id='postContainer' className='col-lg-12 d-flex flex-column align-items-start'>
                        <label htmlFor='postTitle' className='d-none'>Titre du post</label>
                        <input type="text" id="postTitle" className="col-lg-12" placeholder='Titre du post' />
                        <div id="picContainer">
                        <label htmlFor='picUpload' class='d-none'>Votre photo</label>
                        <input id="picUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png"/>
                        <img id="postPic" src={upload} alt="Votre photo" />
                    </div>
                        <label htmlFor='postBody' className='d-none'>Contenu du post</label>
                        <textarea type="text" id="postBody" rows='5' className="col-lg-12" placeholder='Rédigez votre post ici'/>
                    </div>


                    <button id="newPost"className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Postez !</button>
                </form>
                <button id="openForm" className="">
                    +
                </button>
            </div>
              );
    }

    componentDidMount() {

        const openPostForm = document.getElementById('openForm');

        function openForm(){
            const createPost = document.getElementById('createPost');
            createPost.style.display = "flex";
            openPostForm.style.display ='none';
        }

        openPostForm.addEventListener('click', openForm);

        let token = getCookie('token');
        let decoded = jwt_decode(token);
        let userId = decoded.id;
        
        let title = document.getElementById('postTitle');
        let text = document.getElementById('postBody');
        let tag = document.getElementById('postTag');

        let picUpload = document.getElementById('picUpload');
        let picContainer = document.getElementById('picContainer');
        let pic = document.getElementById('postPic');

        picUpload.addEventListener('change', updatePic);

        function updatePic() {

            let uploadedPic = picUpload.files[0];
            if(uploadedPic === 0) {
                let error = document.createElement('p');
                error.textContent = 'Aucun fichier sélectionné';
                picContainer.appendChild(error);
            } else {
                    if(validFileType(uploadedPic)) {
                    pic.src = window.URL.createObjectURL(uploadedPic);
                    return uploadedPic;

                } else {
                    console.log(validFileType(uploadedPic));
                    let error = document.createElement('p');
                    error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                    picContainer.appendChild(error);                   
                    }   
                }
        }

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
        


        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`

        };
        
        function newPost(ev) {
            ev.preventDefault();
        
            let postTitle = title.value;
            let postText = text.value;
            let postTag = tag.value;

            let image = updatePic();

            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', postText);
            formData.append('author', userId);
            formData.append('tag', postTag);
            formData.append('image', image);

            console.log(formData);

            axios.post('http://localhost:8080/api/posts/newPost', 
                formData, 
                {
                    headers
                })
            .then(res => {
                let newPostId = res.data.data.id;
                window.location.href = `/post?id=${newPostId}`

            })
        }
        
            let post = document.getElementById('newPost');
            post.addEventListener('click', newPost);
        }
    }

export default CreatePost