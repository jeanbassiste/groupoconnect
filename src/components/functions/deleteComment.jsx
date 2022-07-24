import axios from "axios";

function deletingComment(comment) {
    axios.delete(`http://localhost:8080/api/comments/${comment}`);
}

export default deletingComment;