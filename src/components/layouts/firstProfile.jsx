//Module de création du profile, ne s'affiche que lors de la première connexion d'un nouvel utilisateur
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../styles/style.css';
import upload from "../../assets/upload.jpg";
import areFormCompleted from '../functions/areFormCompleted';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import setCookie from '../functions/setCookies';

class FirstProfile extends React.Component {
    render() {
        return (
            <div className="main col-lg-6 mx-auto">
                <h1>Votre Profil</h1>

                <form id='formContainer' className="vous">
                    <div className="position-relative d-flex justify-content-center">
                        <label htmlFor='profilePicUpload' className='d-none'>Votre photo</label>
                        <input id="profilePicUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png"/>
                        <img id="profilePic" src={upload} alt="Votre photo" />
                    </div>
                    <div className="nomPrenom">
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="fname" id="fname" />
                            <label htmlFor='fname'>Votre prénom</label>
                        </div>
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="sname" id="sname" />
                            <label htmlFor='sname'>Votre nom</label>
                        </div>
                    </div>
                    <div className="societe">
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="fonction" id="fonction" />
                            <label htmlFor='fonction'>Votre fonction</label>
                        </div>
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="site" id="site" />
                            <label htmlFor='site'>Votre site</label>
                        </div>
                    </div>
                    <button id="createProfile" className="col-12 col-md-6 my-3" type="button" data-bs-toggle="" data-bs-target="">Créer le profil</button>
                </form>
            </div>
        )
    }

    componentDidMount(){

        //On récupère l'id de l'utilisateur contenu dans le token en cookie 
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        let userId = decoded.id;

        //On identifie les champs qui contiendront les infos rentrées par l'utilisateur
        let fname = document.getElementById('fname');
        let sname = document.getElementById('sname');
        let fonction = document.getElementById('fonction');
        let site = document.getElementById('site');

        //On vérifie que les champs ont bien été remplis (aurait pu être simplifié avec une fonction mais fonctionnel quand même)
        fname.addEventListener('change', function () {
            areFormCompleted(this);
        });

        sname.addEventListener('change', function () {
            areFormCompleted(this);
        });

        fonction.addEventListener('change', function () {
            areFormCompleted(this);
        });

        site.addEventListener('change', function () {
            areFormCompleted(this);
        });

        //Gestion de la photo (idem createPost)
        let picUpload = document.getElementById('profilePicUpload');
        let picContainer = document.getElementById('formContainer');
        let pic = document.getElementById('profilePic');
        picUpload.addEventListener('change', updatePic);
        function updatePic() {
            let uploadedPic = picUpload.files[0];
            if(uploadedPic === 0) {
                let error = document.createElement('p');
                error.textContent = 'Aucun fichier sélectionné';
                error.style.color = 'red';
                picContainer.appendChild(error);
            } else {
                    if(validFileType(uploadedPic)) {
                    pic.src = window.URL.createObjectURL(uploadedPic);
                    return uploadedPic;

                } else {
                    let error = document.createElement('p');
                    error.style.color = 'red';
                    error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                    picContainer.appendChild(error);                   
                    }   
                }
        }

        //Vérification du type d'image (idem createPost)
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

        //Création du profile
        let createProfile = document.getElementById('createProfile');
        createProfile.addEventListener('click', sendProfile);

        function sendProfile() {

            //On récupère l'image et on set l'url de la requête API
            let image = updatePic();
            let url = `http://localhost:8080/api/users/${userId}`

            //On enregistre les données remplies par l'utilisateur dans un formData qu'on passera en body de la requête
            const formData = new FormData();
            formData.append('fonction', fonction.value);
            formData.append('site', site.value);
            formData.append('role', 'user');
            formData.append('image', image);
            formData.append('firstName', fname.value);
            formData.append('lastName', sname.value);

            //Requête API
            axios.put(url, formData, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } } )
                .then(res => {
                    //On met à jour le cookie avec le nouveau token (changement du role pour montrer que la création du profile a été faite) et on redirige vers la home
                    let response = res.data;
                    setCookie('token', response.token, 1);
                    window.location.href = `/home`;
                })
        }
    }
}

export default FirstProfile;