import axios from "axios";

function deletingPost(post, headers) {
    console.log('suppression du post numéro ' + post);

    axios.delete(`http://localhost:8080/api/posts/${post}`);

    window.location.href = '/posts'

}

export default deletingPost;