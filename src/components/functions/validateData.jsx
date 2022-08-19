//Permet de vérifier la validité de l'email et du mot de passe choisi par l'utilisateur lors de la connexion ou la création du compte.
//On crée les regEx
let validEmail = new RegExp(/[A-Za-z.]+@groupomania+\.com/); //L'email contien des lettres majuscules et minuscules et termine par @groupomania.com
let validPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/); //Le mot de passe contient au moins 8 caractères dont 1 maj, 1 min, 1 chiffre et 1 caractère spécial

//fonction pour comparer la donnée entrée par l'utilisateur avec la regEx correspondante, selon l'id du champs rempli : 'email' => regEx email etc.
function isValid(data, error, verifyData) {
    let dataToTest = data.value;
    let inputID = data.id;
    if (inputID === 'email') {
        if (validEmail.test(dataToTest) === true) {
            data.setAttribute('class', 'form-control is-valid');
            error.style.display = 'none';
            return true;
        }
        else {
            data.setAttribute('class', 'form-control is-invalid');
            error.style.display = 'initial';
            return false;
        }
    }
    
    if (inputID === 'password') {
        if (validPassword.test(dataToTest) === true) {
            data.setAttribute('class', 'form-control is-valid');
            error.style.display = 'none';
            return true;
        }
        else {
            data.setAttribute('class', 'form-control is-invalid');
            error.style.display = 'initial';
            return false;
        }
    }

    if (inputID === 'verifyPassword') {
        if (data.value === verifyData.value) {
            data.setAttribute('class', 'form-control is-valid');
            error.style.display = 'none';
            return true;
        }
        else {
            data.setAttribute('class', 'form-control is-invalid');
            error.style.display = 'initial';
            return false;
        }
    }
}

export default isValid;