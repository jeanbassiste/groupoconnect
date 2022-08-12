import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import editPost from '../functions/editPost';

import getCookie from './getCookie';
import jwt_decode from 'jwt-decode';
import isUnique from './isUnique';
import like from '../../assets/like-svgrepo-com.svg';
import liked from'../../assets/likeFull-svgrepo-com.svg';
import likePost from './likePost';
import deletingPost from '../functions/deletePost';
import newComment from '../functions/newComment';
import DisplayComments from '../functions/displayComments';
import getUrlPath from '../functions/getURLPath';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import axios from 'axios';

function Test({ post, setPost, update, setUpdate }){
    let token = getCookie('token');
    let userTokenId = jwt_decode(token).id;
    let userTokenRole = jwt_decode(token).role;
    let postId = post.id;

    //Gestion des likes
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState();

    const likes = post.likes;

    useEffect(() => {
        likes.every(like => {
            if (like.userId === userTokenId){
                setIsLiked(true)
                setLikeId(like.id);
                return false
            }
            else {
                setIsLiked(false)
                return true
            }
        },
        [setPost])
    })

    function handleLike() {
        {isLiked
        ? axios.delete(`http://localhost:8080/api/posts/like/${likeId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        : axios.put(`http://localhost:8080/api/posts/like/${postId}`, 
        { userId: userTokenId },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })}
        setUpdate( update + 1 );

    }

    //Création d'un commentaire
    const [newComment, setNewComment] = useState('');

    function handleNewComment() {
        axios.post('http://localhost:8080/api/comments/newComment', {
            text: newComment,
            author: userTokenId,
            post: postId
            },
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }
        )
        .then(
            setUpdate(update + 1)
        )
        
    }

    //Affichage des commentaires
    const comments = post.comments;

    return(
        <div id='pagePost' className='col-12 col-lg-6 mx-auto'>
            <article id='postCard'>
                <div id='postFooter'>
                    <div id='likes'>
                        <img id='likeButton' alt='bouton like' src={isLiked ? liked : like} onClick={() => handleLike()} />
                        <p id='likeCount'>{likes.length} {likes.length >= 2 ? 'likes' : 'like'}</p>
                    </div>
                    <div id='commentCountContainer'>
                        <p id='commentCount'>{comments.length} {comments.length >= 2 ? 'commentaires' : 'commentaire'}</p>
                    </div>
                </div>
            </article>
            <section id='commentSection' className='col-12 mx-auto'>
                <div id='comment'>
                    <textarea id='commentInput' rows='3' placeholder='Votre commentaire' className='commentTextBloc' onChange={(e) => setNewComment(e.target.value) }/>
                    <div id='commentButtonContainer' className='d-flex justify-content-end'>
                        <button id='sendComment' onClick={() => handleNewComment()}>Commentez</button>
                    </div>
                </div>
                {
                    comments.length === 0 
                    ? <p>Soyez le premier à commenter</p>
                    : comments.map((comment) => <DisplayComments comment={comment} userId={userTokenId} isAdmin={userTokenRole} update={update} setUpdate={setUpdate} />)
                } 
            </section>
        </div>
    )






    /*
    const [editPostVisible, seteditPostVisible] = useState(false);
    const [postEdited, setpostEdited] = useState(false);
    const [editCommentVisible, seteditCommentVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(0)
    const [reload, setReload] = useState({
        load:{}
    })

    console.log('on utilise bien la fonction test');

    const {
        id,
        tag,
        text,
        title,
        userId,
        image
    } = post;

    const comments = post.comments;
    const likes = post.likes;
    const author = post.user;
    let isAuthor = false;
    let postUrl = `/post?id=${id}`;
    let authorUrl = `/profile?id=${author.id}`;
    let toggleLike = false;

    let token = getCookie('token');
    let userTokenId = jwt_decode(token).id;
    let userTokenRole = jwt_decode(token).role;

    console.log('count = ' + count);
    useEffect(() => {setCount(likes.length)});
    console.log('count = ' + count);

    likes.forEach(el => {
        if(el.userId === userTokenId){
            toggleLike = true
        }
    })

    /*useEffect(() => {
        if (toggleLike) {
            setIsLiked(current => !current);
            console.log(isLiked);

        }
    }, [toggleLike])

    console.log(userTokenId);
    console.log(userId);
    if(parseInt(userTokenId) === parseInt(userId)){
        isAuthor = true;
    }
    console.log(isAuthor);

    let verifyLikes = isUnique(likes);
    let verifyComments = isUnique(comments);
    let label = `commentTextBox${id}`

    return(
        <section key={id} id="pagePost" className='col-12 col-lg-6 mx-auto'>
        <article id="postCard">
            <header id='titleSection'>
                <div id="postAuthor">
                    <img src={author.image} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                    <NavLink to={authorUrl} className="noLink">
                        <p id="author">{author.firstName} {author.lastName}</p>
                    </NavLink>
                </div>
                <p id="postTag">{tag}</p>
                {!editPostVisible &&
                    <NavLink to={postUrl} className="noLink">
                    <h1 id="postTitle">{title}</h1>
                </NavLink>}
            </header>
            {editPostVisible &&
                        <div id='' className='col-lg-12 mx-auto py-3 d-flex justify-content-center'>
                            <form id="" className='col-lg-12 createPostForm flex-column align-items-start'>
                                <div id="picContainer">
                                    <label htmlFor='picUpload' class='d-none'>Votre photo</label>
                                    <input id="picUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png" />
                                    <img id="postPic" src={image} alt="Votre photo" />
                                </div>
                                <div id='postContainer' className='col-lg-12 d-flex flex-column align-items-start'>
                                    <label htmlFor='editedTitle' className='d-none'>Titre du post</label>
                                    <input type="text" id="editedTitle" className="col-lg-12" defaultValue={title} />
                                    <label htmlFor='editedContent' className='d-none'>Contenu du post</label>
                                    <textarea type="text" id="editedContent" rows='5' className="col-lg-12" defaultValue={text} />
                                </div>
                                <button id="editPost"className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" onClick={() => {editPost({id}, document.getElementById('editedTitle').value, document.getElementById('editedContent').value, {userId}, document.getElementById('picUpload').files[0], document.getElementById('postPic')); seteditPostVisible(current => !current); setReload({...post}) }}>Modifiez le post !</button>
                            </form>
                        </div>
            }
            {!editPostVisible &&
            <div>
                <div id="picContainer">
                        <img id="postPic" src={image} alt={author.firstName} />
                </div> 
                <div id="postBody">
                    <p id="postContent">{text}</p>
                </div>
            </div>}
            <div id="postFooter">
                <div id="likes">
                    <img alt='likeButton' src={(isLiked)
                        ?liked
                        :like
                    } id="likeButton" onClick={
                        () => {
                            likePost(
                                post, 
                                jwt_decode(getCookie('token')).id,
                                isLiked);
                            {
                                console.log('count = ' + count );
                                if (isLiked){
                                    if (count <= 2){
                                        document.getElementById('likeCount').innerText = `${count-1} like`;
                                    }
                                    else {
                                        document.getElementById('likeCount').innerText = `${count-1} likes`;
                                    }
                                    setCount(count - 1);
                                    console.log('count = ' + count );
                                    document.getElementById('likeButton').src = like;
                                }
                                else{
                                    document.getElementById('likeCount').innerText = `${count+1} like`;
    
                                    if (count === 0){
                                        document.getElementById('likeCount').innerText = `${count+1} like`;
                                    }
                                    else {
                                        document.getElementById('likeCount').innerText = `${count+1} likes`;
                                    }
                                    setCount(count + 1);
                                    console.log('count = ' + count );
                                    document.getElementById('likeButton').src = liked;
                                }
                                setIsLiked(current => !current)
                            }}
                    } />
                    {
                        verifyLikes 
                        ? <p id="likeCount">{count} like</p>
                        : <p id="likeCount">{count} likes</p>
                    }
                </div>
                <div id="commentCountContainer">
                {
                        verifyComments
                        ? <p id="commentCount">{comments.length} commentaire</p>
                        : <p id="commentCount">{comments.length} commentaires</p>
                    }
                </div>
                {(userTokenRole === 'admin' || isAuthor) && (getUrlPath() === "/post" ||getUrlPath() === "/test") &&
                    <div id="modifierContainer" className="d-inline"> 
                        <p className='modifier' onClick={
                            () => {
                                deletingPost(id,
                                { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } }
                            )}
                        }>Supprimer</p>
                        <p className='modifier' onClick={() => {seteditPostVisible(current => !current)}}>Editer</p>
                    </div>
                }
            </div>
        </article>
        <section id="commentSection" className='col-12 col-lg-12 mx-auto'>
            <form id="comment">
                <label htmlFor={label} className='d-none'>Votre commentaire</label>
                <textarea type ='text' rows='2' name="commentText" id={label} placeholder='Commentez' className='commentTextBloc' />
                <button id="sendComment" type="button" onClick={
                    () => {
                        newComment(
                            document.getElementById({label}.label).value,
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `${getCookie('token')}`
                            },
                            userTokenId,
                            id
                        )
                    }
                    }>Send</button>
            </form>
            {
                comments.length===0
                ? <p>Soyez le premier à commenter</p>
                : comments.map((comment) => <DisplayComments comment={comment} userId={jwt_decode(getCookie('token')).id} container={document.getElementById('comment')} />)
            }
        </section>       
    </section>                
    )
    

        */}
export default Test
