import axios from 'axios';


function newComment(comment, headers, author, post) {

    console.log(headers);
    console.log(comment);
    console.log(author);
    console.log(post);

    axios.post('http://localhost:8080/api/comments/newComment', {             
                    text: comment,
                    author: author,
                    post: post
                }, 
                    {
                        headers
                    })
                .then(res => {

                    console.log('ça marche');
        
                })

}

export default newComment;