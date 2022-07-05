import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from "../../assets/user.jpg";
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import deconnexion from '../functions/deconnexion';



class Profile extends React.Component {
    render() {
        return (
            <div className="main col-lg-6 mx-auto">
                <div id="auto">
                    <p id="logOut">Se déconnecter</p>
                </div> 
                <div className="upper">
                    <h1 id='name'>Prénom Nom</h1>
                    <h2 id='infos'>Fonction à site</h2>
                    <div id="picContainer">
                        <img id="profilePic" src={user} alt="Votre photo" />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const userId = urlParams.get('id');

        let token = getCookie('token');
        let decoded = jwt_decode(token);
        let id = decoded.id;
        console.log('lutilisateur qui se connecte est : ' + id);
        console.log('lutilisateur du profil est : ' + userId);

        if (parseInt(decoded.id) === parseInt(urlParams.get('id'))) {
            console.log('accès au profil de lutilisateur connecté');
            document.getElementById('auto').style.display = 'initial';

        }
        else {
            console.log(decoded.id + ' est different de ' + urlParams.get('id'));
        }

        document.getElementById('logOut').addEventListener('click', () => {deconnexion('token')});

        let name = document.getElementById('name');
        let infos = document.getElementById('infos');
        let img = document.getElementById('profilePic');

        console.log(userId);

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`

        };

        axios.get(`http://localhost:8080/api/users/${userId}`, {headers})
        .then(res => {
          const user = res.data;
          this.setState({ user });
          console.log('ça a marché');
          console.log(user);

          let fname = user.firstName;
          let sname = user.lastName;
          let site = user.site;
          let fonction = user.fonction;
          let imageUrl = user.imageUrl;



          name.innerText = `${fname} ${sname}`;
          infos.innerText = `${fonction} à ${site}`;
          img.src = imageUrl;



          
        })

        
    }
}

export default Profile;