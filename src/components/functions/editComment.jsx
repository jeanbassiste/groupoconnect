import axios from "axios";
import getCookie from "./getCookie";

function editingComment(comment, text) {
    let token = getCookie('token');

        axios.put(`http://localhost:8080/api/comments/${comment}`, {             
            text: text.value,
        },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(
            //window.location.reload()

        )

}

export default editingComment;