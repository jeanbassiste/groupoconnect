import axios from "axios";
import getCookie from "./getCookie";

function deletingPost(post, headers) {
    let token = getCookie('token');
    axios.delete(`http://localhost:8080/api/posts/${post}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } });
    window.location.href = '/home'
}

export default deletingPost;