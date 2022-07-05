import deleteCookie from "./deleteCookie";

function logOff(cookie) {
    deleteCookie(cookie);
    window.location.href = `/`;
}

export default logOff;