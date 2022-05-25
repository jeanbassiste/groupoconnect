import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';
import fav from '../../assets/star.png';

function Post(id) {
    return (
        <section id="pagePost" className='col-12 col-lg-6 mx-auto'>
            <article id="postCard">
                <header>
                    <div id="postAuthor">
                        <img src={user} id="authorPic" alt="Photo de profile de l'auteur du post"/>
                        <p id="author">Nom d'utilisateur de l'auteur</p>
                    </div>
                    <p id="postTag">Tag du post</p>
                    <h1 id="postTitle">Titre du poste</h1>
                </header>
                <div id="postBody">
                    <p id="postContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit risus eget nunc rutrum, eleifend rhoncus massa ultrices. Mauris tortor felis, dignissim vitae mi vel, efficitur dapibus leo. Mauris eu purus elit. Fusce sit amet arcu nibh. In efficitur arcu non mauris rutrum elementum. Mauris vitae gravida nibh. Suspendisse ullamcorper orci in lectus dignissim, sit amet convallis nulla vehicula. Nullam mi felis, commodo sed sollicitudin ac, ullamcorper pharetra sapien. Suspendisse finibus elit est, non suscipit nisl porta eu. Nunc posuere, turpis vitae scelerisque aliquam, diam ipsum dignissim tellus, eu bibendum purus erat at augue. Curabitur placerat semper euismod. Nam vestibulum lectus nec est elementum aliquet. Pellentesque finibus turpis vel enim pulvinar, non consectetur turpis iaculis. Integer vulputate quis ligula sit amet ullamcorper. Ut sit amet metus sed dolor vulputate dictum.</p>
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
export default Post;