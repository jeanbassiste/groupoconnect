import axios from 'axios';


function newComment(comment, headers, author, post) {

    axios.post('http://localhost:8080/api/comments/newComment', {             
                    text: comment,
                    author: author,
                    post: post
                }, 
                    {
                        headers
                    })
                .then(res => {        
                })

}

export default newComment;