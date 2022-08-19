//Page d'accueil, affiche tous les posts dans l'ordre antéchronologique ; utilisée dans le router

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from '../layouts/createPost';
import DisplayAllPosts from '../layouts/displayAllPosts';
import redirection from '../functions/redirection';


class Feed extends React.Component {
    render(){
        return(
            <div>
                <CreatePost />
                <DisplayAllPosts />
            </div>
        )
    }

    componentDidMount(){
        //Si pas de token en cookie, la personne n'est donc pas connectée et n'a pas accès à cette page => redirigée vers la page de connexion
        redirection();
    }
}

export default Feed