//Module de création de post, utilisé dans la page Home

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
                        <div id="picContainer" className='col-12'>
                            <label htmlFor='picUpload' className='d-none'>Votre photo</label>
                            <input id="picUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png"/>
                            <img id="postPic" src={upload} alt="Votre photo" />
                        </div>
                        <label htmlFor='postTitle' className='d-none'>Titre du post</label>
                        <input type="text" id="postTitle" className="col-lg-12" placeholder='Titre du post' />
                        <label htmlFor='postBody' className='d-none'>Contenu du post</label>
                        <textarea type="text" id="postBody" rows='5' className="col-lg-12" placeholder='Rédigez votre post ici'/>
                    </div>
                    <button id="newPost"className="col-12 col-md-6 my-3" type="button">Postez !</button>
                </form>
                <button id="openForm" className="">
                    Nouveau post
                </button>
            </div>
              );
    }

    componentDidMount() {

        //Gestion de l'affichage du formulaire de création de post
        const openPostForm = document.getElementById('openForm');
        function openForm(){
            const createPost = document.getElementById('createPost');
            createPost.style.display = "flex";
            openPostForm.style.display ='none';
        }
        openPostForm.addEventListener('click', openForm);

        //On récupère les données utiles : id de l'utilisateur en décodant le token contenu en cookie
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        let userId = decoded.id;

        //Création du post :
        
        //On identifie les champs qui contiendront les infos rentrées par l'utilisateur
        let title = document.getElementById('postTitle');
        let text = document.getElementById('postBody');
        let tag = document.getElementById('postTag');

        let picUpload = document.getElementById('picUpload');
        let picContainer = document.getElementById('picContainer');
        let pic = document.getElementById('postPic');
        let formContainer = document.getElementById('createPost');

        //Fonction pour permettre l'affichage en direct de l'image chargée (aurait pu être simplifier en réalisant une fonction, mais marche tout de même)
        picUpload.addEventListener('change', updatePic);

        //Chargement d'une image
        function updatePic() {
            //On récupère le fichier et on vérifie qu'il y a bien un fichier sélectionné
            let uploadedPic = picUpload.files[0];
            if(uploadedPic === 0) {
                //Si non on affiche une erreur
                let error = document.createElement('p');
                error.style.color = 'red';
                error.textContent = 'Aucun fichier sélectionné';
                formContainer.appendChild(error);
            } else {
                //Si oui, on vérifie qu'il s'agit d'un fichier du type voulu, et si oui on l'upload
                    if(validFileType(uploadedPic)) {
                    pic.src = window.URL.createObjectURL(uploadedPic);
                    return uploadedPic;

                } else {
                    //Si non, message d'erreur
                    let error = document.createElement('p');
                    error.style.color = 'red';
                    error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                    formContainer.appendChild(error);                   
                    }   
                }
        }

        //Vérification du type d'image (jpeg, png ou gif)
        let fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]
        function validFileType(file) {
            for(var i = 0; i < fileTypes.length; i++) {
                if(file.type === fileTypes[i]) {
                return true;
                }
            }
            return false;
        }

        //Création d'un nouveau post
        function newPost(ev) {
            ev.preventDefault();
            
            //On récupère les données entrées par l'utilisateur dans les champs
            let postTitle = title.value;
            let postText = text.value;
            let postTag = tag.value;

            //On récupère l'image uploadée
            let image = updatePic();

            //On renseigne tout ça dans un formData qu'on enverra en body de notre requête
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('text', postText);
            formData.append('author', userId);
            formData.append('tag', postTag);
            formData.append('image', image);

            //Requête de création de post
            axios.post('http://localhost:8080/api/posts/newPost', 
                formData, 
                { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }
            )
            .then(res => {
                let newPostId = res.data.data.id;
                //Dès le post créé, on renvoie sur sa page
                window.location.href = `/post?id=${newPostId}`

            })
        }
            let post = document.getElementById('newPost');
            post.addEventListener('click', newPost);
        }
    }

export default CreatePost