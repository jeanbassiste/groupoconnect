import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import getCookie from '../functions/getCookie';
import React from 'react';
import '../../styles/style.css';
import DisplayPost from '../layouts/newPost';
import Post from './post';
import Header from '../layouts/header';

class NewDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    } 

    componentDidMount() {
        let token = getCookie('token');   
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };

        let getAllPosts = axios.get(`http://localhost:8080/api/posts/`, {headers})
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
          console.log('ça a marché');
          console.log(this.state);
          return (this.state.posts)
        })

        //console.log(this.state);

        //console.log(getAllPosts);

        async function postArray(){
            let posts = await getAllPosts;
            posts.map(el => {
                console.log(el);
                return(DisplayPost(el))
            })     
        }

        postArray();

        /*postArray.map(el => {
            console.log(el)
        });*/
    

    }
    render() {
        if(this.state.posts){
                return (this.state.posts.map(el => {
                    console.log(el);
                    return(<div>{el.title}</div>)
                })   )  
            }
        }

}

export default NewDashboard