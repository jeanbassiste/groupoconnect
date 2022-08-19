//Permet de se déconnecter en supprimant le cookie token et en redirigeant vers la page de connexion. Utilisée sur la page profile de l'utilisateur connecté

import deleteCookie from "./deleteCookie";

function logOff(cookie) {
    deleteCookie(cookie);
    window.location.href = `/`;
}

export default logOff;