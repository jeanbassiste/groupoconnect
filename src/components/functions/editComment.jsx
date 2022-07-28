import axios from "axios";

function editingComment(comment, text) {

        axios.put(`http://localhost:8080/api/comments/${comment}`, {             
            text: text.value,
        })
        .then(
            window.location.reload()

        )

}

export default editingComment;