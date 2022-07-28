import getCookie from "./getCookie";

let reqHeaders;

if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))){

    if(getCookie('token')){
        let reqHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getCookie('token')}`    
    }}
}
export default reqHeaders