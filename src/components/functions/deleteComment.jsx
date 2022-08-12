import axios from "axios";
import getCookie from "./getCookie";

function deletingComment(comment) {
    let token = getCookie('token');
    axios.delete(`http://localhost:8080/api/comments/${comment}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } });
}

export default deletingComment;