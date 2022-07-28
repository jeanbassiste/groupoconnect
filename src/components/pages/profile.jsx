import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import FirstProfile from '../layouts/firstProfile';
import Profile from '../layouts/anyProfile';
import currentUser from '../functions/getCurrentUser';
import reqHeaders from '../functions/getReqHeaders';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            role:{}
        }
    }

    componentDidMount(){

        axios.get(`http://localhost:8080/api/users/${currentUser.id}`, {reqHeaders})
        .then(res => {
            this.setState({role: res.data.role});
            console.loge(this.state);
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