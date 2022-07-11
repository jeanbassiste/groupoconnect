import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import DisplayPost from '../layouts/newPost';
import Post from './post';

class NewDashboard extends React.Component {
    constructor() {
        super();
        this.state = {}
    } 

    componentDidMount() {
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
          console.log(this.state);
          let postArray = this.state.posts.map(el => {
            console.log(el);
            DisplayPost(el)
        })
        })
    

    }
    render() {

        return(
            <div>
            {
                this.state.posts.map(el => {
                console.log(el);
                DisplayPost(el)
            })} 
            </div>       
)
    }

}

export default NewDashboard