import axios from "axios";

function deletingPost(post, headers) {
    axios.delete(`http://localhost:8080/api/posts/${post}`);
    window.location.href = '/home'
}

export default deletingPost;