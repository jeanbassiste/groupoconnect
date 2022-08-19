//Permet de récupérer le cookie token. Utilisé sur presque toutes les pages

function getCookie(nom){
    var name = nom + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

export default getCookie;