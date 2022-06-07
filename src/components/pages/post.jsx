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


class Post extends React.Component {


    render(){
        return(
            <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
                <article id="postCard">
                    <header>
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
                <article id="commentSection">
    
                </article>
            </section>
        )
    }

    componentDidMount(){
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const postId = urlParams.get('id');

        let token = getCookie('token');   

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

          console.log(thisPost.id);
          console.log(thisPost.title);

          document.getElementById('postTitle').innerText = `${thisPost.title}`;
          document.getElementById('postContent').innerText = `${thisPost.text}`;
          document.getElementById('author').innerText = `${thisPost.user.firstName} ${thisPost.user.lastName}`


        
        })

        
        

    }

}

export default Post;
