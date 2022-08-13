import React, { useState, useEffect } from 'react';

import deletingComment from "./deleteComment";
import editingComment from "./editComment";
import getCookie from "./getCookie";
import { NavLink } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";


function DisplayComments({comment, userId, isAdmin, update, setUpdate}) {
    let token = getCookie('token');
    let authorUrl = `/profile?id=${comment.user.id}`;

    const [editCommentVisible, setEditCommentVisible] = useState(false);
    const [editedComment, setEditedComment] = useState('');

    function handleEditComment() {
        axios.put(`http://localhost:8080/api/comments/${comment.id}`, {  
            text: editedComment
        },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(
            setEditCommentVisible(current => !current)
        )
        setUpdate(update + 1)
    }

    function handleDelete(){
        axios.delete(`http://localhost:8080/api/comments/${comment.id}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(
            setUpdate(update + 1)
        )
    }


    return(       
        <div>
            <article id={comment.id} className='comment'>
                <div id='commentAuthor'>
                    <img id='authorPic' src={comment.user.image} alt={comment.user.firstName} />
                </div>
                <div id='commentContent'>
                    <NavLink to={authorUrl} className='noLink'>
                        <p id='authorC'>{comment.user.firstName} {comment.user.lastName}</p>
                    </NavLink>

                    <div className='col-12 px-0'>
                        {!editCommentVisible &&
                            <p id='commentContentText' className='hide'>{comment.text}</p>
                        }
                        {editCommentVisible &&
                        <div id='comment' className='col-12 px-0'>
                            <textarea id='commentInput' rows='2' defaultValue={comment.text} className='commentTextBloc' onChange={(e) => setEditedComment(e.target.value)} />
                            <div id='commentButtonContainer' className='d-flex justify-content-end'>
                                <button id='sendComment' onClick={() => handleEditComment()}>Commentez</button>
                            </div>
                        </div>
                        }
                        {(parseInt(userId) === parseInt(comment.user.id) || isAdmin === 'admin') &&
                            <div className='editing d-flex flex-direction-row justify-content-start pt-2'>
                                <p className='modifier hide pl-0' onClick={() => handleDelete()}>Supprimer</p>
                                <p className='modifier hide' onClick={() => setEditCommentVisible(current => !current)}>Modifier</p>
                            </div>
                        }
                    </div>
                </div>
            </article>
        </div>
    )


}

export default DisplayComments