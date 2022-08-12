import axios from "axios";
import getCookie from "./getCookie";

function likePost(post, userId, isLiked) {
    let likeId = null;
    let token = getCookie('token');

    post.likes.forEach(el => {
        if(el.userId === userId) {
            likeId = el.id;     
        }
    })

    if(isLiked === true){
            axios.delete(`http://localhost:8080/api/posts/like/${likeId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
       
    }
    else {
            axios.put(`http://localhost:8080/api/posts/like/${post.id}`, 
            { userId: userId },
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }) 
    }

}

export default likePost;