//Permet de récupérer l'url. Utilisé par le header pour adapter sa version à la page affichée 
function getUrlPath() {
    let urlPath = window.location.pathname;
    return urlPath;
}

export default getUrlPath;