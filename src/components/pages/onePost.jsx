import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import PostDisplayer from '../functions/postDisplayer';


class PostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {post: {},
        hasLoaded: false}
    }

    componentDidMount(){
        let token = getCookie('token');   

        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const postId = urlParams.get('id');

        axios.get(`http://localhost:8080/api/posts/${postId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
            this.setState({post: res.data});
            this.setState({hasLoaded: true});
            console.log(this.state.post)
        })
    }

    render(){
        if(this.state.hasLoaded){
            return <PostDisplayer post={this.state.post} />
        }
        else {
            return(
                <p>Loading...</p>
            )
        }
    }

}

export default PostPage