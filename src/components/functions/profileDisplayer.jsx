import deconnexion from '../functions/deconnexion';
import DeleteProfile from './deleteProfile';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import getCookie from './getCookie';


function ProfileDisplayer({user, userId, pageId, admin}){
    const {
        firstName,
        lastName,
        site,
        fonction,
        image
    } = user;

    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getCookie('token')}`
        }

    return(
        <div className="main col-lg-6 mx-auto">
            <div id="auto">
            {(parseInt(userId) === parseInt(pageId)) && 
                <p id="logOut" onClick={()=> deconnexion('token')}>Se déconnecter</p>
            }
            {admin === 'admin' && parseInt(userId) != parseInt(pageId) &&
                <Popup trigger={<p id='deleteUser'>Supprimer l'utilisateur</p>} position="center">
                    <div id='confirmation'>
                        <p>ATTENTION vous êtes sur le point de supprimer un utilisateur.</p><br />
                        <p>Êtes-vous sûr de vouloir continuer ?</p>
                        <div className="d-flex justify-content-around">
                            <p className='confirm' onClick={() => DeleteProfile(headers, pageId)}>Oui</p>
                            <p className='confirm' onClick={() => window.location.reload()}>Non</p>
                        </div>
                    </div>
                </Popup>            }
            </div>

        <div className="upper">
            <h1 id='name'>{firstName} {lastName}</h1>
            <h2 id='infos'>{fonction} à {site}</h2>
            <div id="picContainer">
                <img id="profilePic" src={image} alt={firstName} />
            </div>
        </div>
    </div>        
    )
}

export default ProfileDisplayer