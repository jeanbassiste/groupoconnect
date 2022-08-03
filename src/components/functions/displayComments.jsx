import React, { useState, useEffect } from 'react';

import deletingComment from "./deleteComment";
import editingComment from "./editComment";
import getCookie from "./getCookie";
import { NavLink } from "react-router-dom";
import jwt_decode from 'jwt-decode';

function DisplayComments({comment, userId}) {
    const [editCommentVisible, seteditCommentVisible] = useState(false);

    let authorUrl = `/profile?id=${comment.user.id}`;
    let token = getCookie('token');
    let userTokenRole = jwt_decode(token).role;
    let label = `commentEditBox${comment.id}`


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
                    {!editCommentVisible &&
                    <p id='commentContentText' className='hide'>{comment.text}</p>
                    }
                                    {editCommentVisible &&
                    <form id="comment">
                    <label htmlFor={label} className='d-none'>Votre commentaire</label>
                    <textarea type ='text' rows='2' name="commentText" id={label} defaultValue={comment.text} className='commentTextBloc' />
                    <button id="sendComment" type="button" onClick={
                        () => {
                            editingComment(
                                comment.id, 
                                document.getElementById(label)
                            );
                            seteditCommentVisible(current => !current);
                }
                }>Send</button>
        </form>}
                    </div>


                {
                    (parseInt(userId) === parseInt(comment.user.id) || userTokenRole === 'admin') &&
                        <div className="editing">
                            <p className="modifier hide" onClick={
                                () => 
                                deletingComment(
                                    comment.id,
                                    { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }
                                )}>Supprimer</p>
                            <p className="modifier hide" onClick={
                                () => seteditCommentVisible(current => !current)}>Editer</p>
                        </div>
                }
            </article>
        </div>
    )
}

export default DisplayComments