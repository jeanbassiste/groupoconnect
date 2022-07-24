import axios from "axios";

function likePost(post, userId, headers) {
    let isLiked = false;
    let likeId = null;

    post.likes.forEach(el => {
        if(el.userId === userId) {
            isLiked = true;
            likeId = el.id;     
        }
    })

    if(isLiked === true){
        axios.delete(`http://localhost:8080/api/posts/like/${likeId}`, {headers})
        .then(res => {
        })        
    }
    else {
        axios.put(`http://localhost:8080/api/posts/like/${post.id}`, {
        userId: userId
            })
        .then(res => {
        },
        {headers})        
    }

}

export default likePost;