import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <form id="createPost" className='createPostForm'>
                    <input type="text" id="postTitle" />Titre du post
                    <input type ="text" id="postBody" />Contenu du post
                    <button id="newPost"className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Postez !</button>
                </form>
                <button id="openForm" className="">
                    +
                </button>
            </div>
              );
    }

    componentDidMount() {
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        console.log(decoded);
        let userId = decoded.Id;
        let role = decoded.role;
        console.log(userId);
        console.log(role);
        
            let title = document.getElementById('postTitle');
            let text = document.getElementById('postBody');
        
            const openPostForm = document.getElementById('openForm');
            function openForm(){
                const createPost = document.getElementById('createPost');
                createPost.style.display = "initial";
            }
            openPostForm.addEventListener('click', openForm);
        
            function newPost(ev) {
                ev.preventDefault();
        
                console.log('parti')
                let postTitle = title.value;
                let postText = text.value;
        
                let dataToSend = {
                    title: postTitle,
                    text: postText,
                    id: userId
                }
        
                console.log(dataToSend);

                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
    
                };

                axios.post('http://localhost:8080/api/posts/newPost', {             
                    title: postTitle,
                    text: postText,
                    author: userId}, 
                    {
                        headers
                    })
                .then(res => {
                    console.log('ça marche');
        
                })
            }
        
            let post = document.getElementById('newPost');
            post.addEventListener('click', newPost);
        }
    }

export default Dashboard