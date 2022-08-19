//Permet d'afficher le mot de passe. Utilisé par les pages login et signup

function displayPassword(togglePassword, passwordData) {
        
    let hideOrDisplay = togglePassword.getAttribute('class');

    if(hideOrDisplay === "bi bi-eye position-absolute end-0 top-0 me-2 mt-1") {
        passwordData.setAttribute('type', 'text');
        togglePassword.removeAttribute('class')
        togglePassword.setAttribute('class', 'bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1')
    }
    if(hideOrDisplay === "bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1") {
        passwordData.setAttribute('type', 'password');
        togglePassword.removeAttribute('class')
        togglePassword.setAttribute('class', 'bi bi-eye position-absolute end-0 top-0 me-2 mt-1')        
    }
    
}

export default displayPassword;