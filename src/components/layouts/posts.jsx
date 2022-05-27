import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/style.css';
import getCookie from '../functions/getCookie';
import jwt_decode from 'jwt-decode';

class Dashboard extends React.Component {
    render() {
        return (
            <p id='text'>Le test</p>
        )
    }

    componentDidMount() {
        let token = getCookie('token');
        let decoded = jwt_decode(token);
        console.log(decoded);
        let userId = decoded.userId;
        let role = decoded.role;
        console.log(userId);
        console.log(role);
        
        document.getElementById('text').innerText = userId;
    }



}

export default Dashboard;