import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import getCookie from './getCookie';
import jwt_decode from 'jwt-decode';
import like from '../../assets/like-svgrepo-com.svg';
import liked from'../../assets/likeFull-svgrepo-com.svg';
import DisplayComments from '../functions/displayComments';
import getUrlPath from '../functions/getURLPath';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import axios from 'axios';
import fav from'../../assets/star-svgrepo-com.svg';
import unfav from'../../assets/star-rate-svgrepo-com.svg';

function PostDisplayer({ post, setPost, update, setUpdate }){
    //éléments basiques utiles
    let token = getCookie('token');
    let userTokenId = jwt_decode(token).id;
    let userTokenRole = jwt_decode(token).role;
    let postId = post.id;
    let author = post.user;

    //Affichage du post
    const {
        id,
        tag,
        text,
        title,
        userId,
        image
    } = post;

    const authorUrl = `/profile?id=${author.id}`;
    const postUrl = `/post?id=${id}`;

    //Modification et suppression du post 
    const [editPostVisible, setEditPostVisible] = useState(false);
    const [newImage, setNewImage] = useState(image);
    const [imageHadChange, setImageHadChange] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newText, setNewText] = useState(text);

    function handleImageChange() {
        let fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        function validFileType(file) {
            for(var i = 0; i < fileTypes.length; i++) {
                if(file.type === fileTypes[i]) {
                return true;
                }
            }
            return false;
        }
        let picUpload = document.getElementById('picUpload');
        let picContainer = document.getElementById('errorContainer');

        let uploadedPic = picUpload.files[0];
        
        if(uploadedPic === 0) {
            let error = document.createElement('p');
            error.textContent = 'Aucun fichier sélectionné';
            picContainer.appendChild(error);
        } else {
            if(validFileType(uploadedPic)) {
                setNewImage(window.URL.createObjectURL(uploadedPic))
                setImageHadChange(true);
                return uploadedPic;
            } else {
                let error = document.createElement('p');
                error.textContent = 'Le format du fichier sélectionné est incorrect ou sa taille dépasse la limite maximale (20ko)';
                picContainer.appendChild(error);                   
                }   
        }
    }

    function handleEditPost() {

        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('text', newText);
        formData.append('author', userId);
        if(imageHadChange) {
            formData.append('image', handleImageChange());
        }

        axios.put(`http://localhost:8080/api/posts/${post.id}`, formData, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(
            setUpdate(update + 1)
        )
        .then(
            setEditPostVisible (current => !current)
        )
    }

    function handleDeletePost() {
        axios.delete(`http://localhost:8080/api/posts/${post.id}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(
            window.location.href = '/home'
        )
    }


    //Gestion des likes
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState();

    const likes = post.likes;

    useEffect(() => {
        if(likes.length === 0) {
            setIsLiked(false);
            return false
        }
        else{
            likes.every(like => {
                if (parseInt(like.userId) === parseInt(userTokenId)){

                    setIsLiked(true)
                    setLikeId(like.id);

                    return false
                }
                else {

                    setIsLiked(false)



                    return true
                }
            })
        }

    })

    function handleLike() {
        {
            (likes.length === 0 || isLiked === false)
            ? axios.put(`http://localhost:8080/api/posts/like/${postId}`, 
            { userId: userTokenId },
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
            : axios.delete(`http://localhost:8080/api/posts/like/${likeId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        }
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

    //Gestion des favoris *NEW*
    const [isFav, setIsFav] = useState(false);
    const [favId, setFavId] = useState();

    const favs = post.favs;

    useEffect(() => {
        if(favs.length === 0) {

            setIsFav(false);
            return false
        }
        else{
            favs.every(fav => {
                if (parseInt(fav.userId) === parseInt(userTokenId)){
                    setIsFav(true)
                    setFavId(fav.id);
    
                    return false
                }
                else {

                    setIsFav(false);

                    return true
                }
            })
        }
    })

    function handleFav(){
        {isFav
            ? axios.delete(`http://localhost:8080/api/posts/fav/${favId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
            : axios.put(`http://localhost:8080/api/posts/fav/${postId}`, 
            { userId: userTokenId },
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })}
            setUpdate( update + 1 );   
    }

    return(
        <div id='pagePost' className='col-12 col-lg-6 mx-auto'>
            <article id='postCard' className='col-12 mx-auto'>
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
                        </NavLink>
                    }
                </header>
                {editPostVisible &&
                    <div className='col-lg-12 mx-auto py-3 px-0 d-flex justify-content-center'>
                        <div id='errorContainer' className='col-lg-12 px-0 createPostForm flex-column align-items-start'>
                            <div id="picContainer">
                                <label htmlFor='picUpload' className='d-none'>Votre photo</label>
                                <input id="picUpload" name="image" type="file" title="" accept=".jpg, .jpeg, .png" onChange={() => handleImageChange() }/>
                                <img id="postPic" src={newImage} alt="Votre photo" />
                            </div>
                            <div id='postContainer' className='col-lg-12 px-0 d-flex flex-column align-items-start'>
                                <label htmlFor='editedTitle' className='d-none'>Titre du post</label>
                                <input type="text" id="editedTitle" className="col-lg-12" defaultValue={title} onChange={(e) => setNewTitle(e.target.value)} />
                                <textarea type="text" id="editedContent" rows='5' className="col-lg-12" defaultValue={text} onChange={(e) => setNewText(e.target.value)} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button id="editPost"className="col-12 col-md-6 my-3 mx-auto" type="button" onClick={() => handleEditPost()}>Modifiez le post !</button>
                            </div>
                        </div>
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
                    </div>
                }
                <div id='postFooter'>
                    <div id='likes'>
                        {
                            userTokenId != author.id && <img id='likeButton' alt='bouton like' src={isLiked ? liked : like} onClick={() => handleLike()} />
                        }
                        <p id='likeCount'>{likes.length} {likes.length >= 2 ? 'likes' : 'like'}</p>
                    </div>
                    <div id='commentCountContainer'>
                        <p id='commentCount'>{comments.length} {comments.length >= 2 ? 'commentaires' : 'commentaire'}</p>
                    </div>
                    {(parseInt(userTokenId) === parseInt(author.id) || userTokenRole === 'admin') && (getUrlPath() === "/post" ||getUrlPath() === "/test") &&
                        <div className='d-flex flex-column flex-md-row editing'>
                            <p className='modifier' onClick={() => handleDeletePost()}>Supprimer</p>
                            <p className='modifier' onClick={() => setEditPostVisible(current => !current)}>Modifier</p>
                        </div>

                    }
                    {
                        parseInt(userTokenId) != parseInt(author.id) && <img id='favButton' alt='bouton de favoris' src={isFav ? unfav : fav} onClick={() => handleFav()} />
                    }
                </div>
            </article>
            <section id='commentSection' className='col-12 mx-auto'>
                <div id='comment'>
                    <label htmlFor={post.id} className='d-none'>commentaire</label>
                    <textarea id={post.id} rows='' placeholder='Votre commentaire' className='commentTextBloc' onChange={(e) => setNewComment(e.target.value) }/>
                    <div id='commentButtonContainer' className='d-flex justify-content-end'>
                        <button id='sendComment' onClick={() => handleNewComment()}>Commentez</button>
                    </div>
                </div>
                {
                    comments.length === 0 
                    ? <p>Soyez le premier à commenter</p>
                    : comments.map((comment) => <DisplayComments key={comment.id} comment={comment} userId={userTokenId} isAdmin={userTokenRole} update={update} setUpdate={setUpdate} />)
                } 
            </section>
        </div>
    )
}
export default PostDisplayer
