//Permet d'afficher un profile. Utilisé sur la page profile

import deconnexion from '../functions/deconnexion';
import DeleteProfile from './deleteProfile';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import getCookie from './getCookie';

function ProfileDisplayer({user, userId, pageId, admin}){
    //On récupère les infos de l'utilisateur dont on affiche le profile, passée par le composant parent en prop
    const {
        firstName,
        lastName,
        site,
        fonction,
        image
    } = user;


    let token = getCookie('token');


    return(
        <div className="main col-lg-6 mx-auto">
            <div id="auto">
            {//Si le progile est celui de l'utilisateur connecté, on lui donne la possibilité de se déconnecter
                (parseInt(userId) === parseInt(pageId)) && 
                <p id="logOut" onClick={()=> deconnexion('token')}>Se déconnecter</p>
            }
            {//Si l'utilisateur connecté est admin, on lui donne la possibilité de supprimer l'utilisateur du profile ; SAUF si c'est son propre profile (ne pas supprimer l'admin)
            admin === 'admin' && parseInt(userId) != parseInt(pageId) &&
                <Popup trigger={<p id='deleteUser'>Supprimer l'utilisateur</p>} position="center">
                    <div id='confirmation'>
                        <p>ATTENTION vous êtes sur le point de supprimer un utilisateur.</p><br />
                        <p>Êtes-vous sûr de vouloir continuer ?</p>
                        <div className="d-flex justify-content-around">
                            <p className='confirm' onClick={() => DeleteProfile({ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }, pageId)}>Oui</p>
                            <p className='confirm' onClick={() => window.location.reload()}>Non</p>
                        </div>
                    </div>
                </Popup>            }
            </div>

        <div className="upper">
            <h1 id='name'>{firstName} {lastName}</h1>
            <h2 id='infos'>{fonction} à {site}</h2>
            <div className='d-flex justify-content-center my-4'>
                <img id="profilePic" src={image} alt={firstName} />
            </div>
        </div>
    </div>        
    )
}

export default ProfileDisplayer