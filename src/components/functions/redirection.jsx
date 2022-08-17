function redirection() {
    if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))){
        return true;
    }
    else{
        window.location.href = `/login`       

    }    
}

export default redirection;