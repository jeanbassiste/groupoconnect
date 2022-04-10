import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import displayPassword from '../functions/displayPassword';
import isValid from '../functions/validateData';

class Login extends React.Component {
    render() {
        return (
            <div className='main col-lg-6 mx-auto'>    
                <h1>Bienvenue sur GroupoConnect !</h1>
                <h2>Le réseau social des employés de Groupomania</h2>
                <p>Connectez-vous en utilisant votre adresse @groupomania.com</p>
                <form id="loginForm" className="loginForm" noValidate>
                    <input type="email" className="form-control" id="email" autocomplete="off" name="email" placeholder="jane.doe@groupomania.com" />
                    <p id="emailError">Utilisez une adresse @groupomania.com valide.</p>
                    <div className='d-flex flex-row position-relative'><input type="password" className="form-control" id="password" autocomplete="off" name="password" placeholder="Mot de passe" /> <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seePassword"></i></div>
                    <p id="passwordError">Le mot de passe doit contenir : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                    <button id="logInButton" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Connectez-vous</button>
                </form>
                <p>Première connexion ? <NavLink to="/signup">Créez votre compte !</NavLink></p>
            </div>            
        );
    }

    componentDidMount() {
        
        let togglePassword = document.getElementById('seePassword');
        let passwordData = document.getElementById('password');
        
        togglePassword.addEventListener('click', () => {displayPassword(togglePassword, passwordData)});
    
        let emailData = document.getElementById('email');
        let emailError = document.getElementById('emailError');
        let passwordError = document.getElementById('passwordError');

        emailData.addEventListener('change', () => isValid(emailData, emailError));
        passwordData.addEventListener('change', () => isValid(passwordData, passwordError));

        let logIn = document.getElementById('logInButton');

        function logingIn(ev) {
            ev.preventDefault();

            let emailValidation = isValid(emailData, emailError);
            let passwordValidation = isValid(passwordData, passwordError);

            if (emailValidation === true && passwordValidation === true) {
                console.log('Prepare to send the data with Axios');
            }
            else {
                console.log("Le mot de passe ou l'adresse email ne respecte pas les normes attendues")
            }
        }

        logIn.addEventListener('click', logingIn);   
    }
}

export default Login;       