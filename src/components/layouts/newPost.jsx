import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';
import fav from '../../assets/star.png';

function DisplayPost(el) {
    console.log('je suis dans la fonction REACT DisplayPost');

        return (
            <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                <article id="postCard">
                    <header>
                        <div id="postAuthor">
                            <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                            <p id="author">{el.user.firstName} {el.user.lastName}</p>
                        </div>
                        <p id="postTag">{el.tag}</p>
                        <h1 id="postTitle">{el.title}</h1>
                    </header>
                    <div id="postBody">
                        <p id="postContent">{el.text}</p>
                    </div>
                    <div id="postFooter">
                        <div id="likes">
                            <img src={like} id="likeButton" />
                            <p id="likeCount">{el.likes.length} likes</p>
                        </div>
                        <div id="commentCountContainer">
                            <p id="commentCount">{el.comments.length} commentaire</p>
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

export default DisplayPost