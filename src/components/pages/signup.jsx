import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import displayPassword from '../functions/displayPassword';
import isValid from '../functions/validateData';
import setCookie from '../functions/setCookies';
//import jwt_decode from "jwt-decode";

class Signup extends React.Component {
    render() {
        return (
            <div className='main col-lg-6 mx-auto'>
            <h1>Bienvenue sur GroupoConnect !</h1>
            <h2>Le réseau social des employés de Groupomania</h2>
            <p>Créez votre compte et rencontrez vos collaborateurs !</p>
    
            <form id="signUpForm" className="signupForm" noValidate>
                <input type="email" className="form-control" id="email" autoComplete="off" name="email" placeholder="jane.doe@groupomania.com" />
                <p id="emailError">Utilisez une adresse @groupomania.com valide.</p>
                <div className='d-flex flex-row position-relative'><input type="password" className="form-control" id="password" autoComplete="off" name="password" placeholder="Mot de passe" /> <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seePassword"></i></div>
                <p id="passwordError">Le mot de passe doit contenir : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                <div className='d-flex flex-row position-relative'><input type="password" className="form-control" id="verifyPassword" autoComplete="off" name="password" placeholder="Répétez votre mot de passe" /> <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seeVerifyPassword"></i></div>
                <p id="verifyError">Les deux mots de passe ne sont pas identiques.</p>
                <button id="SignUpButton" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Inscrivez-vous</button>
                <p id="uniqueEmail">L'adresse email doit être unique.</p>
            </form>
            <p>Déjà membre ? <NavLink to="/login">Connectez-vous !</NavLink></p>
    
            </div>
              );
    }

    componentDidMount(){
       
        setCookie('coucou', 'coucou', 1);

        let togglePassword = document.getElementById('seePassword');
        let passwordData = document.getElementById('password');
        let toggleVerify = document.getElementById('seeVerifyPassword');
        let verifyData = document.getElementById('verifyPassword');
        
        togglePassword.addEventListener('click', () => {displayPassword(togglePassword, passwordData)});
        toggleVerify.addEventListener('click', () => {displayPassword(toggleVerify, verifyData)});

        let emailData = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let passwordError = document.getElementById('passwordError');
        let verifyError = document.getElementById('verifyError');

        emailData.addEventListener('change', () => isValid(emailData, emailError));
        passwordData.addEventListener('change', () => isValid(passwordData, passwordError));
        verifyData.addEventListener('change', () => isValid(verifyData, verifyError, passwordData));
        
        let signUp = document.getElementById('SignUpButton');

        function signingUp(ev) {
            ev.preventDefault();

            console.log('working');
            
            let emailValidation = isValid(emailData, emailError);
            let passwordValidation = isValid(passwordData, passwordError);
            let verifyValidation = isValid(verifyData, verifyError, passwordData);

            console.log(emailValidation + ' ' + passwordValidation + ' ' + verifyValidation);

            if (emailValidation === true && passwordValidation === true && verifyValidation === true) {
                console.log('prepare to send data with Axios');
                
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };

                axios.post('http://localhost:8080/api/users/signup', {
                    emailAddress: emailData.value,
                    password: passwordData.value,
                    role: 'newUser'
                    },
                    headers )

                    .then(res => {
                        console.log('données envoyées : ' + emailData + passwordData);
                        console.log(res);
                        console.log(res.data);
                        let response = res.data;

                        if (response) {
                            console.log('ça marche');
                            let token = response.token;
                            console.log(token);
                            setCookie('token', token, 1);
                            window.location.href = '/changeProfile'
                        }
                        else {
                            console.error('Code Erreur', res.status);
                            document.getElementById('uniqueEmail').style.display = 'initial';

                        }
                    })
            }
            else {
                console.log("Le mot de passe ou l'adresse email ne respecte pas les normes attendues ou les mots de passe ne correspondent pas");
                document.getElementById('uniqueEmail').style.display = 'initial';
            }
        }

        signUp.addEventListener('click', signingUp);
        
    }
}

export default Signup;

// Faire 2 pages distinctes profile et firstProfile ; mais firstProfile vérifie le role ; si newUser => s'affiche ; si non, renvoie vers "profile"

// Possibilité de faire vérifier le rôle via l'id tout en back, sans forcément le passer par le token, au moment de la connection à la page firstprofile