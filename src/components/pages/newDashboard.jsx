import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import DisplayPost from '../layouts/newPost';
import Post from './post';
import Header from '../layouts/header';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';
import fav from '../../assets/star.png';
import jwt_decode from 'jwt-decode';
import test from '../functions/test';
import newComment from '../functions/newComment';
import likePost from '../functions/likePost';
import displayComments from '../functions/newDisplayComment';


class NewDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    } 

    componentDidMount() {
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const postId = urlParams.get('id');

        let token = getCookie('token');
        let userId = jwt_decode(token).id;
        
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };

        axios.get(`http://localhost:8080/api/posts/`, {headers})
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
          console.log('ça a marché');
          console.log(this.state);
          return (this.state.posts)
        })
    }

    render() {

        if(this.state.posts){
            
                return (this.state.posts.map(el => {
                    console.log(jwt_decode(getCookie('token')).id)
                    console.log(el);
                    return(
                        <section key={el.id} id="pagePost" className='col-12 col-lg-6 mx-auto'>
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
                                    <img src={like} id="likeButton" onClick={() => {likePost(el, jwt_decode(getCookie('token')).id)}}/>
                                    <p id="likeCount">{el.likes.length} likes</p>
                                    {

                                    }
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
                            <form id="comment">
                                <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                                <button id="sendComment" type="button" data-bs-toggle="" data-bs-target="" onClick={() => newComment(document.getElementById('commentText'), {'Accept': 'application/json','Content-Type': 'application/json','Authorization': `${getCookie('token')}`}, jwt_decode(getCookie('token')).id, el.id)} >Send</button>
                            </form>
                            <p id='displayComment' onClick={() => {console.log(displayComments(el.comments, jwt_decode(getCookie('token')).id))}}>Afficher les commentaires</p>           
                        </article>
                    </section>
                        )
                })   )

            }


        }

        componentDidUpdate(){
            let boutonTest = document.getElementById('favButton');
            boutonTest.addEventListener('click', () => {
                console.log('cest vraiment de la merde')
            } )
        }

}

export default NewDashboard