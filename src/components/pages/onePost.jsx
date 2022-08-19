//Page qui permet d'afficher un post seul ; permet aussi de modifier et supprimer ce post si on en est l'auteur ou l'admin ; utilisée dans le router

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import PostDisplayer from '../functions/postDisplayer';
import { useEffect } from 'react';
import { useState } from 'react';
import redirection from '../functions/redirection';



function PostPage() {
    //Si pas de token en cookie, la personne n'est donc pas connectée et n'a pas accès à cette page => redirigée vers la page de connexion
    redirection();

    //Paramétrage du state
    const [post, setPost] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(false);

    //Récupération des infos utiles : token pour le passer en header des requêtes et vérifier l'authenticité de l'utilisateur ; paramètres d'url pour récupérer le post à afficher
    const token = getCookie('token');;
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const postId = urlParams.get('id');

    //A chaque mise à jour du state (update), on refait une requête sur le post pour mettre à jour les infos récupérées
    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${postId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            //On sauvegarde les infos retournées par la requête API dans le state et on informe le state que la requête a été effectuée avec hasLoaded
            setPost(res.data);
            setHasLoaded(true);
        })        
    },
    [update])

    return (
        <div>
        {
            //On vérifie que la requête a été effectuée avec hasLoaded : si oui, on va afficher le post ; si non, message d'attente
            hasLoaded
            ? <PostDisplayer key={post.id} post={post} setPost={setPost} update={update} setUpdate={setUpdate} />
            : <p>Loading...</p>
        }
        </div>
    )
}

export default PostPage