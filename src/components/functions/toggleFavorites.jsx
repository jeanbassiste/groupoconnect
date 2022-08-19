//Permet de choisir entre l'affichage des posts créés et celui des posts favoris. Disponible sur la page profile de l'utilisateur connecté.
import React, { useState, useEffect } from 'react';

function ToggleFavorites({toggleFav, setToggleFavorites, update, setUpdate}) {

    function handleTogglePost() {
        setToggleFavorites(false);
        setUpdate(update + 1);
    }

    function handleToggleFav() {
        setToggleFavorites(true);
        setUpdate(update + 1);
    }

    return(
        <div className='main col-lg-6 mx-auto d-flex p-0 my-0'>
            <div id='togglePosts' className={toggleFav ?'col-6' :'col-6 selected'} onClick={() => handleTogglePost()}>
                <p>Posts</p>
            </div>
            <div id='toggleFavs' className={toggleFav ?'col-6 selected' :'col-6'} onClick={() => handleToggleFav()}>
                <p>Favoris</p>
            </div>
        </div>
    )

}

export default ToggleFavorites;