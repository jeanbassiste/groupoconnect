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