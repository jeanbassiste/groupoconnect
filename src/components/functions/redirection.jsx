//Vérifie la présence du token en cookie, si non, redirige vers la page login. Utilisé par toutes les pages nécessitant d'être connecté
function redirection() {
    if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))){
        return true;
    }
    else{
        window.location.href = `/login`       

    }    
}

export default redirection;