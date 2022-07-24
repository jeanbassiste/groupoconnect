import { render } from "@testing-library/react";
import deletingComment from "./deleteComment";
import editingComment from "./editComment";
import getCookie from "./getCookie";
import { NavLink } from "react-router-dom";

function DisplayComments({comment, userId, container}) {
    console.log(comment);
    console.log(userId);
    let authorUrl = `/profile?id=${comment.user.id}`;

    return(
        <div>
            <article key={comment.id} id={comment.id} className='comment'>
                <div id='commentAuthor'>
                    <img id='authorPic' src={comment.user.image} alt={comment.user.firstName} /> 
                </div>
                <div id="commentContent" className={comment.id}>
                    <NavLink to={authorUrl} className='noLink'>
                        <p id='authorC'>{comment.user.firstName} {comment.user.lastName}</p>
                    </NavLink>
                    <p id='commentContentText' className='hide'>{comment.text}</p>
                </div>
                {
                    userId === comment.user.id &&
                        <div className="editing">
                            <p className="modifier hide" onClick={
                                () => 
                                deletingComment(
                                    comment.id,
                                    {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `${getCookie('token')}`
                                    }
                                )}>Supprimer</p>
                            <p className="modifier hide" onClick={
                                () => 
                                editingComment(
                                    comment.id, 
                                    comment.text, 
                                    document.getElementById(`${comment.id}`), 
                                    document.getElementById(`${comment.id}`), 
                                    {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `${getCookie('token')}`
                                    }
                                )}>Editer</p>
                        </div>
                }
            </article>
        </div>
    )
}

export default DisplayComments