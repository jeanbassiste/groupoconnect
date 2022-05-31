import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import upload from "../../assets/upload.jpg";
import areFormCompleted from '../functions/areFormCompleted';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';


class FirstProfile extends React.Component {
    render() {
        return (
            <div className="main col-lg-6 mx-auto">
                <h1>Votre Profil</h1>

                <form className="vous">
                    <div id="picContainer">
                        <input id="picUpload" type="file" title="" accept=".jpg, .jpeg, .png"/>
                        <img id="profilePic" src={upload} alt="Votre photo" />
                    </div>
                    <div className="nomPrenom">
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="fname" id="fname" />
                            <label for='fname'>Votre prénom</label>
                        </div>
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="sname" id="sname" />
                            <label for='sname'>Votre nom</label>
                        </div>
                    </div>
                    <div className="societe">
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="fonction" id="fonction" />
                            <label for='fonction'>Votre fonction</label>
                        </div>
                        <div className="formContainer">
                            <input type ="text" className="proForm form-control" name="site" id="site" />
                            <label for='site'>Votre site</label>
                        </div>
                    </div>
                    <button id="createProfile" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Créer le profil</button>
                </form>
            </div>
        )
    }

    componentDidMount(){
        
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        console.log(decoded);
        let userId = decoded.Id;
        let role = decoded.role;
        console.log(userId);
        console.log(role);

        let fname = document.getElementById('fname');
        let sname = document.getElementById('sname');
        let fonction = document.getElementById('fonction');
        let site = document.getElementById('site');

        fname.addEventListener('change', function () {
            console.log(this);
            areFormCompleted(this);
        });

        sname.addEventListener('change', function () {
            console.log(this);
            areFormCompleted(this);
        });

        fonction.addEventListener('change', function () {
            console.log(this);
            areFormCompleted(this);
        });

        site.addEventListener('change', function () {
            console.log(this);
            areFormCompleted(this);
        });

        let picUpload = document.getElementById('picUpload');
        let picContainer = document.getElementById('picContainer');
        let pic = document.getElementById('profilePic');

        picUpload.addEventListener('change', updatePic);

        function updatePic() {
            let uploadedPic = picUpload.files;
  
            if(uploadedPic.length === 0) {
                let error = document.createElement('p');
                error.textContent = 'Aucun fichier sélectionné';
                picContainer.appendChild(error);
            } else {
                for(var i = 0; i < uploadedPic.length; i++) {
                    if(validFileType(uploadedPic[i])) {
                    pic.src = window.URL.createObjectURL(uploadedPic[i]);
                } else {
                    let error = document.createElement('p');
                    error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                    picContainer.appendChild(error);                   
                    }   
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

        let createProfile = document.getElementById('createProfile');

        createProfile.addEventListener('click', sendProfile);

        function sendProfile() {
            console.log('prêt à Axioser');
            console.log(fname.value + ' ' + sname.value + ' ' + site.value + ' ' + fonction.value)

            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`

            };
            console.log(headers.Authorization);

            let url = `http://localhost:8080/api/users/${userId}`
            console.log(url);
            axios.put(url, {
                firstName: fname.value,
                lastName: sname.value,
                site: site.value,
                fonction: fonction.value,
                role: 'user',
                imageUrl: pic.src}, {
                    headers
                }
                 )

                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    let response = res.data;

                    if (response) {
                        console.log('ça marche');
                        window.location.href = `/profil?id=${userId}`;
                    }
                    else {
                        console.error('Code Erreur', res.status)
                    }
                })
        }
    }
}

export default FirstProfile;