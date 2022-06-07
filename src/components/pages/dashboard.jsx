import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';

class Dashboard extends React.Component {
    state = {
        posts: []
    }

    render(){
        return(
            <div id='dashboard'></div>
        )
    }

    componentDidMount(){

        let token = getCookie('token');   

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`

        };

        axios.get(`http://localhost:8080/api/posts/`, {headers})
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
          console.log('ça a marché');
          console.log(posts);
        })

        
        

    }

}

export default Dashboard;
