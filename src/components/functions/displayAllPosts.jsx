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
import editingPost from '../functions/editingPost';
import deletingPost from '../functions/deletePost';
import newComment from '../functions/newComment';
import DisplayComments from '../functions/displayComments';
import Header from '../layouts/header';
import PostDisplayer from './postDisplayer';

class DisplayAllPosts extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [{
            postData: {},
            authorData: {},
            comments: [],
            likes: [],
            isAuthor: false
        }],
        hasLoaded: false
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

        axios.get(`http://localhost:8080/api/posts/`, {headers})
        .then((response) => {
            console.log(response.data);
            this.setState({posts: response.data});
            this.setState({hasLoaded: true});
            return (this.state.posts)
        })

    }

    render(){
        if(this.state.hasLoaded){
            console.log(this.state.posts);
            return(this.state.posts.map(post => {
                console.log(post);
                return <PostDisplayer post={post} />
                //<postDisplayer post={post} />

                /*const {
                    id,
                    tag,
                    text,
                    title,
                    userId
                } = post;

                const comments = post.comments;
                const likes = post.likes;
                const author = post.user;
                let isAuthor = false;

                console.log(comments);
                console.log(likes);
                console.log(author);

                let token = getCookie('token');
                console.log(token);

                let userTokenId = jwt_decode(token).id;
                console.log(userTokenId);

                console.log(userId);

                if(userTokenId === userId){
                    isAuthor = true;
                }


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



                return(
                    <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                    <article id="postCard">
                        <header id='titleSection'>
                            <div id="postAuthor">
                                <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                                <p id="author">{author.firstName} {author.lastName}</p>
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
                                            post, 
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
                            {isAuthor &&
                                <div id="modifierContainer" className="d-inline"> 
                                    <p className='modifier' onClick={
                                        () => {
                                            deletingPost(id,
                                            {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Authorization': `${getCookie('token')}`
                                            }
                                        )}
                                    }>Supprimer</p>
                                    <p className='modifier' onClick={
                                        () => {
                                            editingPost(
                                                id, 
                                                document.getElementById('titleSection'), 
                                                document.getElementById('postBody'), 
                                                document.getElementById('postTitle'), 
                                                document.getElementById('postContent'), 
                                                title, 
                                                text,
                                                {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `${getCookie('token')}`
                                                }
                                            )}
                                        }>Editer</p>
                                </div>
                            }
                        </div>
                    </article>
                    <section id="commentSection" className='col-12 col-lg-12 mx-auto'>
                        <form id="comment">
                            <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                            <button id="sendComment" type="button" onClick={
                                () => {
                                    newComment(
                                        document.getElementById('commentText'),
                                        {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `${getCookie('token')}`
                                        },
                                        userId,
                                        id
                                    )}
                                }>Send</button>
                        </form>
                        {
                            comments.length===0
                            ? <p>Soyez le premier à commenter</p>
                            : comments.map((comment) => <DisplayComments comment={comment} userId={jwt_decode(getCookie('token')).id} container={document.getElementById('comment')} />)
                        }
                    </section>       
                </section>                )*/
            })
            )
        }else {
            return(
                <p>prout</p>
                )
        }


            /*
        const postData = this.state.postData;
        const authorData = this.state.authorData;
        const comments = this.state.comments;
        const likes = this.state.likes;
        const isAuthor = this.state.isAuthor;
        console.log(isAuthor);

        const {
            id,
            tag,
            text,
            title,
            userId
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
                                        postData, 
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
                        {isAuthor &&
                            <div id="modifierContainer" className="d-inline"> 
                                <p className='modifier' onClick={
                                    () => {
                                        deletingPost(id,
                                        {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `${getCookie('token')}`
                                        }
                                    )}
                                }>Supprimer</p>
                                <p className='modifier' onClick={
                                    () => {
                                        editingPost(
                                            id, 
                                            document.getElementById('titleSection'), 
                                            document.getElementById('postBody'), 
                                            document.getElementById('postTitle'), 
                                            document.getElementById('postContent'), 
                                            title, 
                                            text,
                                            {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Authorization': `${getCookie('token')}`
                                            }
                                        )}
                                    }>Editer</p>
                            </div>
                        }
                    </div>
                </article>
                <section id="commentSection" className='col-12 col-lg-12 mx-auto'>
                    <form id="comment">
                        <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                        <button id="sendComment" type="button" onClick={
                            () => {
                                newComment(
                                    document.getElementById('commentText'),
                                    {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `${getCookie('token')}`
                                    },
                                    userId,
                                    id
                                )}
                            }>Send</button>
                    </form>
                    {
                        comments.length===0
                        ? <p>Soyez le premier à commenter</p>
                        : comments.map((comment) => <DisplayComments comment={comment} userId={jwt_decode(getCookie('token')).id} container={document.getElementById('comment')} />)
                    }
                </section>       
            </section>
        )*/
        
        
    }


}

export default DisplayAllPosts