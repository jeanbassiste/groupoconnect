function setCookie(nom, valeur, expiration){
    const d = new Date();
    d.setTime(d.getTime() + (expiration*24*60*60*1000));
    let dateExpiration = "expires=" + d.toUTCString();
    document.cookie = nom + "=" + valeur + ";" + dateExpiration;
    //console.log(document.cookie);  
  }

export default setCookie;