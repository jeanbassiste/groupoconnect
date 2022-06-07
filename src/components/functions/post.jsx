import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';
import fav from '../../assets/star.png';

function post(id) {
    return (
        <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
            <article id="postCard">
                <header>
                    <div id="postAuthor">
                        <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                        <p id="author">Nom d'utilisateur de l'auteur</p>
                    </div>
                    <p id="postTag">Tag du post</p>
                    <h1 id="postTitle">`${id.title}`</h1>
                </header>
                <div id="postBody">
                    <p id="postContent">`${id.text}`</p>
                </div>
                <div id="postFooter">
                    <div id="likes">
                        <img src={like} id="likeButton" />
                        <p id="likeCount">3 likes</p>
                    </div>
                    <div id="commentCountContainer">
                        <p id="commentCount">1 commentaire</p>
                    </div>
                    <div id="favorite">
                        <img src={fav} id="favButton" />
                    </div>
                </div>
            </article>
            <article id="commentSection">

            </article>
        </section>
    )
}
export default post;