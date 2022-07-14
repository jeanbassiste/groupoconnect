import deletingComment from "./deleteComment";
import editingComment from "./editComment";

function displayComments(commentsArray, userId) {
    console.log('sploute');

    commentsArray.map((el) => {
        console.log('sploute ' + el.id)
    
      /*let html += <article id='comment' key={el.id}>
                <div id="commentAuthor">
                    <img  id='authorPic' alt=' ' />
                    <p id='authorC'>{el.user.firstName} {el.user.lastName}</p>
                </div>
                <div id='commentContent'>
                    <p id='commentText'>{el.text}</p>
                </div>
                {userId===el.user.id && <div><p class='modifier' onClick={() => {deletingComment(el.id)}}>Supprimer</p><p class='modifier' onClick={() => {editingComment(el.id)}}>Modifier</p></div>}
            </article>*/

    })


} 

export default displayComments