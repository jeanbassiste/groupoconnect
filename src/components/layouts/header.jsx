//Module header qui s'affiche sur toutes les pages, pas toujours identique. Utilisé sur toutes les pages dans le router

import React from 'react';
import '../../styles/style.css';
import logo from '../../assets/icon-left-font-monochrome-white.svg';
import profil from '../../assets/user.jpg';
import home from '../../assets/home.png';
import getUrlPath from '../functions/getURLPath';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import { NavLink } from "react-router-dom";
import axios from 'axios';



class Header extends React.Component {

    render() {
        return (
        <div className='header col-lg-6 mx-auto'>
            <nav className='navigation'>
                <NavLink to='/home' id='home' title="retour à l'accueil">
                    <img className='navIcon' src={home} alt='Icone de maison' />
                </NavLink>
                <img src={logo} alt="Groupomania" />
                <a href='/profile' id='userPage' title="profil de l'utilisateur">
                    <img id="smallProfilePic" className='navIcon' src={profil} alt='Icone de silhouette' />
                </a>
            </nav>
        </div>
        );
    }

    componentDidMount(){

        //On récupère l'url pour connaitre la page qui s'affiche et adapter l'affichage du header
        let urlPath = getUrlPath();

        if (urlPath === "/home" || urlPath === "/post" || urlPath === "/profile") {
            //Si on est sur la page home, post ou profile, on affiche les boutons de retour à l'accueil et d'ouverture du profile SAUF sur la page de création de profile (if)
            let token = getCookie('token');
            let decoded = jwt_decode(token);
            if(decoded.role === 'newUser'){
                document.getElementById('userPage').style.display = 'none';
                document.getElementById('home').style.display = 'none';
            }
            else {
                let userId = decoded.id;
                document.getElementById('userPage').setAttribute('href', `/profile?id=${userId}`)  
                axios.get(`http://localhost:8080/api/users/${userId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
                .then(res => {
                  const user = res.data;
                  document.getElementById('smallProfilePic').src = user.image;
                })

            }

        }
        else {
            //Si on est sur toute autre page, on n'affiche pas ces boutons
            document.getElementById('userPage').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            }

    }

}

export default Header;