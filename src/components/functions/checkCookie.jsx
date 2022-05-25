function checkCookie(){
    let token = getCookie("token");
    return token;
}

export default checkCookie;