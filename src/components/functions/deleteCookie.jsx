function deleteCookie(nom) {
    document.cookie = nom + "=" + "" + "; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

export default deleteCookie;