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
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(false);
    const [toggleFavorites, setToggleFavorites] = useState(false);

    const token = getCookie('token');
    const tokenUserId = jwt_decode(getCookie("token")).id;
    const tokenUserRole = jwt_decode(getCookie("token")).role;
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const userId = urlParams.get('id');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            const data = res.data;
            setUser(data);
            {
                !toggleFavorites && setPosts(data.posts);
            }
            setHasLoaded(true);
        })
        },
        [update]
    )

    let favoritedPosts = []
    
    if(hasLoaded) {
        user.favs.forEach(fav => {
            favoritedPosts.push(fav.post)
        })
    }

    useEffect(() => {
        {
            toggleFavorites && setPosts(favoritedPosts);
        }
    }, [toggleFavorites, update])

    return(
        <div>
            {
                hasLoaded
                ? <div>
                    <ProfileDisplayer user={user} userId={tokenUserId} pageId={userId}  admin={tokenUserRole} />
                    <ToggleFavorites toggleFav={toggleFavorites} setToggleFavorites={setToggleFavorites} update={update} setUpdate={setUpdate}/>
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