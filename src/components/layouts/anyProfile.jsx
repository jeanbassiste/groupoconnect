//Layout de tous les profiles non-nouveaux => permet de récupérer les données du profiles concernées et les passes à la fonction qui permet d'afficher le profile. Utilisé par la page profile

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import '../../styles/style.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import ProfileDisplayer from '../functions/profileDisplayer';
import PostDisplayer from '../functions/postDisplayer';
import { useState } from 'react';
import ToggleFavorites from '../functions/toggleFavorites';

function Profile() {
    //On paramètre le state
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(false);
    const [toggleFavorites, setToggleFavorites] = useState(false);

    //On récupère le token en cookie, le rôle et l'id de l'utilisateur ; et l'id du profile à afficher dans les paramètres d'url
    const token = getCookie('token');
    const tokenUserId = jwt_decode(getCookie("token")).id;
    const tokenUserRole = jwt_decode(getCookie("token")).role;
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const userId = urlParams.get('id');

    //A chaque rechargement et modification du state, on recharge les données de l'utilisateur via la requête api
    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            const data = res.data;
            //On enregistre les données du profile à consulter dans le state
            setUser(data);
            {//Si je n'esssaye pas d'afficher les favoris ; j'enregistre les posts de l'utilisateur dans le state
                !toggleFavorites && setPosts(data.posts);
            }
            //J'informe la page que la requête a été effecutée grâce à hasLoaded
            setHasLoaded(true);
        })
        },
        [update]
    )

    //Gestion des favoris
    let favoritedPosts = []
    
    if(hasLoaded) {
        //Une fois la requête effectuée uniquement, j'enregistre les favoris de l'utilisateur dans la constante prévue à cette effet
        user.favs.forEach(fav => {
            favoritedPosts.push(fav.post)
        })
    }

    //Dès que je choisi d'afficher mes favoris (toggleFavorites est modifiée), je remplace mon state post par les posts favoris (au lieu des posts créés)
    useEffect(() => {
        {
            toggleFavorites && setPosts(favoritedPosts);
        }
    }, [toggleFavorites, update])

    return(
        <div>
            {
                //Je vérifie que la requête a été effectuée avec hasLoaded ; si oui, j'affiche le profile, si non, texte de chargement
                //J'affiche d'abord le profile avec ProfileDisplayer ; puis je vérifie si le profile en question est celui de l'utilisateur
                //Si oui, j'affiche la possibilité d'afficher les favoris
                //Ensuite j'affiche les posts contenus dans le state post
                hasLoaded
                ? <div>
                    <ProfileDisplayer user={user} userId={tokenUserId} pageId={userId}  admin={tokenUserRole} />
                    {parseInt(tokenUserId) === parseInt(userId)
                        && <ToggleFavorites toggleFav={toggleFavorites} setToggleFavorites={setToggleFavorites} update={update} setUpdate={setUpdate}/>
                    }
                        { posts.length !=0 
                            ? posts.map(post => {
                            return <PostDisplayer key={post.id} post={post} setPost={setPosts} update={update} setUpdate={setUpdate} />
                        })
                            : <div className='main col-lg-6 mx-auto px-0 py-3'>{!toggleFavorites ?<div>{userId != tokenUserId ?<p>Cet utilisateur n'a encore aucun post à afficher</p> :<p>Vous n'avez encore aucun post à afficher</p>}</div> :<p>Vous n'avez encore aucun favori</p>}</div>}
                    </div>
                : <p>Loading...</p>
            } 
        </div>    
    )





}

export default Profile;