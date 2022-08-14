import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import '../../styles/style.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import ProfileDisplayer from '../functions/profileDisplayer';
import PostDisplayer from '../functions/postDisplayer';
import { useState } from 'react';

function Profile() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(false);

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
            setPosts(data.posts);
            setHasLoaded(true);
        })
        },
        [update]
    )

    return(
        <div>
            {
                hasLoaded
                ? <div>
                    <ProfileDisplayer user={user} userId={tokenUserId} pageId={userId}  admin={tokenUserRole} />
                        { posts.length !=0 
                            ? posts.map(post => {
                            return <PostDisplayer key={post.id} post={post} setPost={setPosts} update={update} setUpdate={setUpdate} />
                        })
                            : <p>Cet utilisateur n'a encore aucun post à afficher</p>}
                    </div>
                : <p>Loading...</p>
            } 
        </div>    
    )





}

/*class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            posts:{},
            hasLoaded: false,
        }
    }

    componentDidMount(){
        const token = getCookie('token');
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const userId = urlParams.get('id');

        axios.get(`http://localhost:8080/api/users/${userId}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
        .then(res => {
          const user = res.data;
          this.setState({ user: user });
          this.setState({ posts: user.posts });
          this.setState({ hasLoaded: true });
        })  
    }

    render() {
        if(this.state.hasLoaded){
            return (
                <div>
                    <ProfileDisplayer user={this.state.user} userId={jwt_decode(getCookie("token")).id} pageId={new URLSearchParams(window.location.search).get("id")}  admin={jwt_decode(getCookie("token")).role} />
                    { this.state.posts.length !=0 
                        ? this.state.posts.map(post => {
                            return <PostDisplayer post={post} />
                        })
                        : <p>Cet utilisateur n'a encore aucun post à afficher</p>}
                </div>
            )
        }else {
            return(
                <p>Loading...</p>
                )
        }
       
    }
}*/

export default Profile;