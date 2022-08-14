import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import displayPassword from '../functions/displayPassword';
import isValid from '../functions/validateData';
import setCookie from '../functions/setCookies';

class Signup extends React.Component {
    render() {
        return (
            <div className='main col-lg-6 mx-auto'>
                <h1>Bienvenue sur GroupoConnect !</h1>
                <h2>Le réseau social des employés de Groupomania</h2>
                <p>Créez votre compte et rencontrez vos collaborateurs !</p>
    
                <form id="signUpForm" className="signupForm" noValidate>
                    <label htmlFor='email' className='d-none'>email</label>
                    <input type="email" className="form-control" id="email" autoComplete="off" name="email" placeholder="jane.doe@groupomania.com" />
                    <p id="emailError">Utilisez une adresse @groupomania.com valide et unique.</p>
                    <div className='d-flex flex-row position-relative'>
                        <label htmlFor='password' className='d-none'>password</label>
                        <input type="password" className="form-control" id="password" autoComplete="off" name="password" placeholder="Mot de passe" /> 
                        <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seePassword"></i>
                    </div>
                    <p id="passwordError">Le mot de passe doit contenir : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
                    <div className='d-flex flex-row position-relative'>
                        <label htmlFor='verifyPassword' className='d-none'>verifyPassword</label>
                        <input type="password" className="form-control" id="verifyPassword" autoComplete="off" name="password" placeholder="Répétez votre mot de passe" /> 
                        <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seeVerifyPassword"></i>
                    </div>
                    <p id="verifyError">Les deux mots de passe ne sont pas identiques.</p>
                    <button id="SignUpButton" className="col-12 col-md-6 my-3" type="button" data-bs-toggle="" data-bs-target="">Inscrivez-vous</button>
                </form>
                
                <p>Déjà membre ? <NavLink to="/login">Connectez-vous !</NavLink></p>
            </div>
        );
    }

    componentDidMount(){

        if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))){
            window.location.href = `/home`       
        }
        
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
            
            let emailValidation = isValid(emailData, emailError);
            let passwordValidation = isValid(passwordData, passwordError);
            let verifyValidation = isValid(verifyData, verifyError, passwordData);

            if (emailValidation === true && passwordValidation === true && verifyValidation === true) {

                axios.post('http://localhost:8080/api/users/signup', {
                    emailAddress: emailData.value,
                    password: passwordData.value,
                    role: 'newUser'
                    },
                    { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'} } 
                )
                .then(res => {
                    let token = res.data.token;
                    setCookie('token', token, 1);
                    window.location.href = '/profile'
                })
            }
        }

        signUp.addEventListener('click', signingUp);
        
    }
}

export default Signup;