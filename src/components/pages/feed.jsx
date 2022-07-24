import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from '../layouts/createPost';
import DisplayAllPosts from '../layouts/displayAllPosts';


class Feed extends React.Component {
    render(){
        return(
            <div>
                <CreatePost />
                <DisplayAllPosts />
            </div>
        )
    }
}

export default Feed