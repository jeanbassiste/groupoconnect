import deconnexion from '../functions/deconnexion';
//import DeleteProfile from './deleteProfile';

function ProfileDisplayer({user, userId, pageId, admin}){
    const {
        firstName,
        lastName,
        site,
        fonction,
        image
    } = user;


    return(
        <div className="main col-lg-6 mx-auto">

        <div id="auto">
            {(parseInt(userId) === parseInt(pageId)) && 
                <p id="logOut" onClick={()=> deconnexion('token')}>Se déconnecter</p>
            }
            {admin === 'admin' && parseInt(userId) != parseInt(pageId) &&
                <p id='deleteUser'>Supprimer l'utilisateur</p>
            }
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