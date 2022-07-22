import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import getCookie from "../functions/getCookie";
import jwt_decode from 'jwt-decode';
import FirstProfile from '../layouts/firstProfile';
import Profile from '../layouts/anyProfile';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            role:{}
        }
    }

    componentDidMount(){
        let tokenId = jwt_decode(getCookie('token')).id;

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getCookie('token')}`
        };

        axios.get(`http://localhost:8080/api/users/${tokenId}`, {headers})
        .then(res => {
            this.setState({role: res.data.role})
        })
    }

    render(){
        if(this.state.role === 'newUser'){
            return(
                <FirstProfile />
            ) 
        }
        else {
            return(
                <Profile />
            )
        }

    }
}

export default ProfilePage