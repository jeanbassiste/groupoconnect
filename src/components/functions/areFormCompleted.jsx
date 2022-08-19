//Permet de vérifier que les champs ont été remplis, si oui on leur passe une nouvelle classe. Utilisés sur la création de post et la création de profile.
function areFormCompleted(labelToCheck) {

    let labelContent = labelToCheck.value;

    if(labelContent != '') {
      labelToCheck.setAttribute('class', 'proForm form-control completed');
    }
    else {
      labelToCheck.classList.remove('completed');
    }
}

export default areFormCompleted;