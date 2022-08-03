import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import axios from 'axios';
import PostDisplayer from '../functions/postDisplayer';

class DisplayAllPosts extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [{
            postData: {},
            authorData: {},
            comments: [],
            likes: [],
            isAuthor: false
        }],
        hasLoaded: false
        }        
    }

    componentDidMount(){
        let token = getCookie('token');   

        axios.get(`http://localhost:8080/api/posts/`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then((response) => {
            this.setState({posts: response.data});
            this.setState({hasLoaded: true});
            return (this.state.posts)
        })

    }

    render(){
        if(this.state.hasLoaded){
            return(this.state.posts.map(post => {
                return <PostDisplayer post={post} />
            })
            )
        }else {
            return(
                <p>Loading...</p>
                )
        }
    }
}

export default DisplayAllPosts