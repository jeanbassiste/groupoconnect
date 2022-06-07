import axios from 'axios';


function newComment(comment, headers) {

    let commentText = comment.value;
    console.log(headers);
    console.log(commentText);
    /*
    axios.post('http://localhost:8080/api/posts/Comment', {             
                    text: comment,}, 
                    {
                        headers
                    })
                .then(res => {
                    console.log('ça marche');
        
                })*/

}

export default newComment;