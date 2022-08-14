import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import PostDisplayer from '../functions/postDisplayer';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';



function PostPage() {
    const [post, setPost] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(false);

    const token = getCookie('token');
    const tokenUserId = jwt_decode(getCookie("token")).id;
    const tokenUserRole = jwt_decode(getCookie("token")).role;
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const postId = urlParams.get('id');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${postId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            setPost(res.data);
            setHasLoaded(true);
        })        
    },
    [update])
    console.log(post);

    return (
        <div>
        {
            hasLoaded
            ? <PostDisplayer key={post.id} post={post} setPost={setPost} update={update} setUpdate={setUpdate} />
            : <p>Loading...</p>
        }
        </div>
    )
}

export default PostPage