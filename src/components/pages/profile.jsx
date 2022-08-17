import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import FirstProfile from '../layouts/firstProfile';
import Profile from '../layouts/anyProfile';
import currentUser from '../functions/getCurrentUser';
import getCookie from '../functions/getCookie';
import redirection from '../functions/redirection';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            role:{}
        }
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

    componentDidMount(){
        redirection();

        if(redirection() === true){
            let token = getCookie('token');
            axios.get(`http://localhost:8080/api/users/${currentUser.id}`, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
            .then(res => {
                this.setState({role: res.data.role});
            })
        }
    }
}

export default ProfilePage