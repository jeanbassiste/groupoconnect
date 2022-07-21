import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import like from '../../assets/like-svgrepo-com.svg';
import user from '../../assets/user.jpg';
import likePost from './likePost';

class DisplayOnePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: {},
            authorData: {},
            comments: [],
            likes: []
        }
    }

    componentDidMount(){
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const id = urlParams.get('id');

        let token = getCookie('token');   
        let userId = jwt_decode(token).id;

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };

        axios.get(`http://localhost:8080/api/posts/${id}`, {headers})
        .then((response) => {
            this.setState({postData: response.data});
            this.setState({authorData: response.data.user});
            this.setState({comments: response.data.comments})
            console.log(this.state);
        })

    }

    render(){
        const postData = this.state.postData;
        const authorData = this.state.authorData;
        const comments = this.state.comments;
        const likes = this.state.likes;

        const {
            id,
            tag,
            text,
            title
        } = postData;

        const {
            firstName,
            lastName
        } = authorData;

        function isUnique(value) {
            if (value.length === 0 || value.length === 1) {
                return true;
            }
            else {
                return false;
            }
        }

        let verifyLikes = isUnique(likes);
        let verifyComments = isUnique(comments);

        console.log(verifyLikes);
        console.log(verifyComments);

        console.log(comments.length);

        return(
            <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                <article id="postCard">
                    <header id='titleSection'>
                        <div id="postAuthor">
                            <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                            <p id="author">{firstName} {lastName}</p>
                        </div>
                        <p id="postTag">{tag}</p>
                        <h1 id="postTitle">{title}</h1>
                    </header>
                    <div id="postBody">
                        <p id="postContent">{text}</p>
                    </div>
                    <div id="postFooter">
                        <div id="likes">
                            <img src={like} id="likeButton" onClick={
                                () => {
                                    likePost(
                                        {postData}, 
                                        jwt_decode(getCookie('token')).id, 
                                        {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `${getCookie('token')}`
                                        }
                                )}
                            } />
                            {
                                verifyLikes 
                                ? <p id="likeCount">{likes.length} like</p>
                                : <p id="likeCount">{likes.length} likes</p>
                            }
                        </div>
                        <div id="commentCountContainer">
                        {
                                verifyComments
                                ? <p id="commentCount">{comments.length} commentaire</p>
                                : <p id="commentCount">{comments.length} commentaires</p>
                            }
                        </div>
                    </div>
                </article>
                <section id="commentSection" className='col-12 col-lg-12 mx-auto'>
                    <form id="comment">
                        <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                        <button id="sendComment" type="button" data-bs-toggle="" data-bs-target="">Send</button>
                    </form>
                </section>       
            </section>
        )
    }
}

export default DisplayOnePost

