import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
                        <label htmlFor='picUpload' class='d-none'>Votre photo</label>
                        <input id="picUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png"/>
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
                    <button id="createProfile" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Créer le profil</button>
                </form>
            </div>
        )
    }

    componentDidMount(){
        
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        let userId = decoded.id;

        let fname = document.getElementById('fname');
        let sname = document.getElementById('sname');
        let fonction = document.getElementById('fonction');
        let site = document.getElementById('site');

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

        let picUpload = document.getElementById('picUpload');
        let picContainer = document.getElementById('picContainer');
        let pic = document.getElementById('profilePic');

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

        let createProfile = document.getElementById('createProfile');

        createProfile.addEventListener('click', sendProfile);

        function sendProfile() {

            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`

            };
            let image = updatePic();

            let url = `http://localhost:8080/api/users/${userId}`

            const formData = new FormData();
            formData.append('fonction', fonction.value);
            formData.append('site', site.value);
            formData.append('role', 'user');
            formData.append('image', image);
            formData.append('firstName', fname.value);
            formData.append('lastName', sname.value);

            axios.put(url, formData, { headers })

                .then(res => {
                    let response = res.data;

                    if (response) {
                        console.log('ça marche');
                        window.location.href = `/home`;
                    }
                    else {
                        console.error('Code Erreur', res.status)
                    }
                })
        }
    }
}

export default FirstProfile;