import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import upload from "../../assets/upload.jpg";
import areFormCompleted from '../functions/areFormCompleted';

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

        let fname = document.getElementById('fname');
        let sname = document.getElementById('sname');
        let fonction = document.getElementById('fonction');
        let site = document.getElementById('site');
        let picUpload = document.getElementById('picUpload');
        let profilePic = document.getElementById('profilePic');
        let picContainer = document.getElementById('picContainer');

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

        picUpload.addEventListener('change', uploadPic);

        function uploadPic() {
            console.log('start uploading');
            let pic = picUpload.files;

            if(pic.length === 0) {
                let error = document.createElement('p');
                error.textContent = 'Aucun fichier sélectionné';

                picContainer.appendChild(error);
            }
            else {

                for(var i = 0; i < pic.length; i++) {
                if(validFile(pic)){
                    console.log('la nest pas lerreur');
                    profilePic.src = window.URL.createObjectURL(pic);
                }
                else{
                    let error = document.createElement('p');
                    error.textContent = 'Mauvais format de fichier';
                }
            }
            }
        }

        var fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png'
        ]

        function validFile(file){
            for(var i = 0; i < fileTypes.length; i++){
                if(file.type === fileTypes[i]){
                    return true;
                }
            }
            return false;
        }


    }
}

export default FirstProfile;