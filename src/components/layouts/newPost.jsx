import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class DisplayPost extends React.Component {
    constructor(post) {
        super(post);
        this.state = {
            id: "",
            tag: "",
            text: "",
            title: "",
            user: {
                firstName: "",
                lastName: "",
                imgUrl: ""
            },
            comments: []


        }
    }

    render(){
        return (
            <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                <article id="postCard">
                    <header>
                        <div id="postAuthor">
                            <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                            <p id="author">`${this.state.user.firstName} ${this.state.user.lastName}`</p>
                        </div>
                        <p id="postTag">`${this.state.tag}`</p>
                        <h1 id="postTitle">`${this.state.title}`</h1>
                    </header>
                    <div id="postBody">
                        <p id="postContent">`${this.state.text}`</p>
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
}

export default DisplayPost