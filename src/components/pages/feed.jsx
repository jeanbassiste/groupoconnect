import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from '../layouts/createPost';
import DisplayAllPosts from '../layouts/displayAllPosts';
import redirection from '../functions/redirection';


class Feed extends React.Component {
    render(){
        return(
            <div>
                <CreatePost />
                <DisplayAllPosts />
            </div>
        )
    }

    componentDidMount(){
        redirection();
    }
}

export default Feed