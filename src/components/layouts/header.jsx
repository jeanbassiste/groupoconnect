import React from 'react';
import '../../styles/style.css';
import logo from '../../assets/icon-left-font-monochrome-white.svg';
import profil from '../../assets/user.jpg';
import home from '../../assets/home.png';
import getUrlPath from '../functions/getURLPath';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';

class Header extends React.Component {
    render() {
        return (
        <div className='header col-lg-6 mx-auto'>
            <nav className='navigation'>
                <a id='home' href='http://localhost:3000/home' title="retour à l'accueil">
                    <img className='navIcon' src={home} alt='Icone de maison' />
                </a>
                <img src={logo} alt="Groupomania" />
                <a id='userPage' href='#' title='Profil utilisateur'>
                    <img className='navIcon' src={profil} alt='Icone de silhouette' />
                </a>
            </nav>
        </div>
        );
    }

    componentDidMount(){
        let urlPath = getUrlPath();
        console.log(urlPath);





        if (urlPath === "/login" || urlPath === "/signup" || urlPath === "/changeProfile" || urlPath === "/") {
            document.getElementById('home').style.display = 'none';
            document.getElementById('userPage').style.display = 'none';            
        }
        else if (urlPath === '/feed') {
            document.getElementById('home').style.display = 'none';
        }
        else if (urlPath === '/profile') {
            document.getElementById('userPage').style.display = 'none';
        }
        else{
            let token = getCookie('token');
            let decoded = jwt_decode(token);
            let userId = decoded.id;
            document.getElementById('userPage').setAttribute('href', `/profil?id=${userId}`)

        }
    }

}

export default Header;