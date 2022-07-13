import axios from "axios";

function likePost(post, userId) {
    console.log('entrer');
    let isLiked = false;
    let likeId = null;

    post.likes.forEach(el => {
        console.log(el.userId);
        console.log(userId);
        if(el.userId === userId) {
            console.log('lutilisateur qui a liké est celui qui est connecté');
            isLiked = true;
            likeId = el.id;
            
        }
        else {
            console.log('lutilisateur qui a liké nest pas celui qui est connecté');

        }        
    })

    if(isLiked === true){
        console.log('unlike');
        axios.delete(`http://localhost:8080/api/posts/like/${likeId}`)
        .then(res => {
            console.log('proutOUT');
        })        
    }
    else {
        console.log('like');
        axios.put(`http://localhost:8080/api/posts/like/${post.id}`, {
        userId: userId
            })
        .then(res => {
            console.log('proutprout');
        })        
    }

}

export default likePost;