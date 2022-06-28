import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import post from '../functions/post';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';
import fav from '../../assets/star.png';
import newComment from '../functions/newComment';
import jwt_decode from 'jwt-decode';
import displayComment from '../functions/displayComment';
import editingPost from '../functions/editingPost';
import deletingPost from '../functions/deletePost';


class Post extends React.Component {


    render(){
        return(
            <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                <article id="postCard">
                    <header id='titleSection'>
                        <div id="postAuthor">
                            <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                            <p id="author">Nom d'utilisateur de l'auteur</p>
                        </div>
                        <p id="postTag">Tag du post</p>
                        <h1 id="postTitle">`titre`</h1>
                    </header>
                    <div id="postBody">
                        <p id="postContent">`text`</p>
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
                <section id="commentSection" className='col-12 col-lg-12 mx-auto'>
                    <form id="comment">
                        <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                        <button id="sendComment" type="button" data-bs-toggle="" data-bs-target="">Send</button>
                    </form>
                </section>
            </section>
        )
    }

    componentDidMount(){
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const postId = urlParams.get('id');
        
        let token = getCookie('token');   
        let userId = jwt_decode(token).id;

        console.log(userId);
        console.log(postId);

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`

        };

        axios.get(`http://localhost:8080/api/posts/${postId}`, {headers})
        .then(res => {
          const thisPost = res.data;
          this.setState({ post });
          console.log('ça a marché');
          console.log(thisPost);
          console.log('Ouais cest bien ça');
          console.log(thisPost.comments.length);

          console.log(thisPost.id);
          console.log(thisPost.title);

          document.getElementById('postTitle').innerText = `${thisPost.title}`;
          document.getElementById('postContent').innerText = `${thisPost.text}`;
          document.getElementById('author').innerText = `${thisPost.user.firstName} ${thisPost.user.lastName}`;
          document.getElementById('postTag').innerText = `${thisPost.tag}`;
          document.getElementById('commentCount').innerText = `${thisPost.comments.length} commentaires`;

          let likeButton = document.getElementById('likeButton');

          likeButton.addEventListener('click', () => {
            console.log('prout 2');

            axios.put(`http://localhost:8080/api/posts/like/${postId}`, {
                userId: userId
            })
            .then(res => {
                console.log('proutprout');
            })

          })

          if(userId === thisPost.user.id){
            let deletePost = document.createElement('p');
            deletePost.setAttribute('class', 'modifier');
            deletePost.innerText = 'Supprimer';
            let editPost = document.createElement('p');
            editPost.setAttribute('class', 'modifier');
            editPost.innerText = 'Modifier';
            document.getElementById('postFooter').appendChild(deletePost);
            document.getElementById('postFooter').appendChild(editPost);

            console.log(thisPost.title);
            console.log(thisPost.text);
            
    
            deletePost.addEventListener('click', () => deletingPost(thisPost.id));
            editPost.addEventListener('click', () => editingPost(thisPost.id, document.getElementById('titleSection'), document.getElementById('postBody'), document.getElementById('postTitle'), document.getElementById('postContent'), thisPost.title, thisPost.text));
          }

          console.log(thisPost.comments);
          console.log(thisPost.comments[0]);
          console.log(thisPost.comments[0].text);
          console.log(thisPost.comments[0].user.firstName);
          let commentfn = thisPost.comments[0].user.firstName;
          let commentln = thisPost.comments[0].user.lastName;
          let commentText = thisPost.comments[0].text;
          console.log(commentText);

          let comments = thisPost.comments;

          comments.forEach(item => {
            displayComment(item, userId);
          })

          
        
        })

        let sendComment = document.getElementById('sendComment');
    
        let comment = document.getElementById('commentText');

        sendComment.addEventListener('click', () => {newComment(comment, headers, userId, postId)});

    }



}

export default Post;
