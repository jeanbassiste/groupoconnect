import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from "../../assets/user.jpg";
import axios from 'axios';

class Profile extends React.Component {
    render() {
        return (
            <div className="main col-lg-6 mx-auto">
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

        let name = document.getElementById('name');
        let infos = document.getElementById('infos');

        console.log(userId);

        axios.get(`http://localhost:8080/api/users/${userId}`)
        .then(res => {
          const user = res.data;
          this.setState({ user });
          console.log('ça a marché');
          console.log(user);

          let fname = user.firstName;
          let sname = user.lastName;
          let site = user.site;
          let fonction = user.fonction;



          name.innerText = `${fname} ${sname}`;
          infos.innerText = `${fonction} à ${site}`;



          
        })

        
    }
}

export default Profile;