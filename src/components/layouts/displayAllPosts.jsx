//Module d'affichage de tous les posts, utilisé par la page Home ou Feed

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React, { useState, useEffect } from 'react';
import '../../styles/style.css';
import PostDisplayer from '../functions/postDisplayer';

function PostPage() {
    //Parametrage du state
    const [hasLoaded, setHasLoaded] = useState(false);
    const [posts, setPosts] = useState({});
    const [update, setUpdate] = useState(0);

    //On récupère le token en cookie pour le passer en header des requêtes api pour vérifier l'authenticité de l'utilisateur
    let token = getCookie('token');

    //A chaque rechargement du state (update), on recharge les données des posts avec une nouvelle requête API
    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            //On enregistre les posts dans le state et on prévient que la requête a été effectuée avec hasLoaded
            setPosts(res.data);
            setHasLoaded(true);
        })},
        [update]
    )

    return(
        <div>
            {
                hasLoaded 
                //Si la requête a été effectuée, on affiche les posts avec la fonction postDisplayer ; sinon : message de chargement
                ? posts.map((post) => <PostDisplayer key={post.id} post={post} setPost={setPosts} update={update} setUpdate={setUpdate} />) 
                : <p>Loading...</p>
            }        
        </div>
    )

}

export default PostPage
