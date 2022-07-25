import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../styles/style.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';
import ProfileDisplayer from '../functions/profileDisplayer';
import PostDisplayer from '../functions/postDisplayer';

class Profile extends React.Component {
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

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`

        };

        axios.get(`http://localhost:8080/api/users/${userId}`, {headers})
        .then(res => {
          const user = res.data;
          this.setState({ user: user });
          this.setState({posts: user.posts});
          this.setState({hasLoaded: true});
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
}

export default Profile;