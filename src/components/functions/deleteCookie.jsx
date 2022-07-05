function deleteCookie(nom) {
    document.cookie = nom + "" + "; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    console.log('le cookie a été effacé');
}

export default deleteCookie;