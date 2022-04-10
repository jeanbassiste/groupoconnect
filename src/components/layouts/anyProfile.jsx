import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from "../../assets/user.jpg";

class Profile extends React.Component {
    render() {
        return (
            <div className="main col-lg-6 mx-auto">
                <div className="upper">
                    <h1>Prénom Nom</h1>
                    <h2>Fonction à site</h2>
                    <div id="picContainer">
                        <img id="profilePic" src={user} alt="Votre photo" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;