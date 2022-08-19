//Page d'affichage d'un profile, utilisée dans le router

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import FirstProfile from '../layouts/firstProfile';
import Profile from '../layouts/anyProfile';
import currentUser from '../functions/getCurrentUser';
import getCookie from '../functions/getCookie';
import redirection from '../functions/redirection';

class ProfilePage extends React.Component {
    //on prépare le state qui servira à stocker le rôle de l'utilisateur
    constructor(props){
        super(props);
        this.state = {
            role:{}
        }
    }

    //selon le rôle, on affiche la bonne page : en cas de première connexion (role = newUser) on affichage la page de création du profile. Si non, on affiche le profile
    render(){
        if(this.state.role === 'newUser'){
            return(
                <FirstProfile />
            ) 
        }
        else {
            return(
                <Profile />
            )
        }

    }

    componentDidMount(){
        //Si pas de token en cookie, la personne n'est donc pas connectée et n'a pas accès à cette page => redirigée vers la page de connexion
        redirection();

        //Si pas de redirection, on fait la requête api pour charger les infos du profile de la personne qui se connecte
        if(redirection() === true){
            let token = getCookie('token');
            axios.get(`http://localhost:8080/api/users/${currentUser.id}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
            .then(res => {
                this.setState({role: res.data.role});
            })
        }
    }
}

export default ProfilePage