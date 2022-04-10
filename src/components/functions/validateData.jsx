let validEmail = new RegExp(/[A-Za-z.]+@groupomania+\.com/);
let validPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

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
            data.setAttribute('class', 'form-control');
            error.style.display = 'none';
            return true;
        }
        else {
            data.setAttribute('class', 'form-control is-invalid');
            error.style.display = 'initial';
            return false;
        }
    }

    if (inputID === 'VerifyPassword') {
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