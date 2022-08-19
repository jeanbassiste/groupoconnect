//Test, assez peu utilisé au final : permet de récupérer les infos de l'utilisateur (id et rôle) contenus dans le cookie token
import getCookie from "./getCookie";
import jwt_decode from 'jwt-decode';

let currentUser;

if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))){
    let token = getCookie('token');
    let id = jwt_decode(token).id;
    let role = jwt_decode(token).role;
    
    currentUser = {
        id: id,
        role: role
    }
}
    
export default currentUser;