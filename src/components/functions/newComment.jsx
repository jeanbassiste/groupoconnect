import axios from 'axios';
import getCookie from './getCookie';


function newComment(comment, headers, author, post) {
    let token = getCookie('token');


    axios.post('http://localhost:8080/api/comments/newComment', {             
                    text: comment,
                    author: author,
                    post: post
                }, 
                { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }
                )
                .then(res => {        
                    window.location.reload();
                })

}

export default newComment;