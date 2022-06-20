import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import user from '../../assets/user.jpg';
import like from '../../assets/like-svgrepo-com.svg';

function Comment(id) {
    return (
        <section id="commentSection" className='col-12 col-lg-6 mx-auto'>
            <form id="comment">
                <input type ='text' name="commentText" id="commentText" placeholder='Commentez'/>
                <button id="sendComment" type="button" data-bs-toggle="" data-bs-target="">Send</button>
            </form>
            <article id="comment">
                <div id="commentAuthor">
                    <img src={user} id="authorPic" alt="Photo de profile de l'auteur du commentaire"/>
                </div>
                <div id="commentContent">
                    <p id="author">Nom d'utilisateur de l'auteur</p>
                    <p id="commentText">Ceci est le commentaire : ce message me plait beaucoup ! Merci d'avoir partagé :)</p> 
                </div>
            </article>
        </section>
    )
}
export default Comment;