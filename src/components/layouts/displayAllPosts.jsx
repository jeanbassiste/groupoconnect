import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React, { useState, useEffect } from 'react';
import '../../styles/style.css';
import PostDisplayer from '../functions/postDisplayer';

function PostPage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [posts, setPosts] = useState({});
    const [update, setUpdate] = useState(0);
    
    let token = getCookie('token');
    console.log(token);

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const postId = urlParams.get('id');


    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            setPosts(res.data);
            setHasLoaded(true);
        })},
        [update]
    )

    return(
        <div>
            {
                hasLoaded 
                ? posts.map((post) => <PostDisplayer key={post.id} post={post} setPost={setPosts} update={update} setUpdate={setUpdate} />) 
                : <p>Loading...</p>
            }        
        </div>
    )

}

export default PostPage

/*    

            */