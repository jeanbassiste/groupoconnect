//page 404 à afficher si url incorrect ; utilisée dans le router

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class NotFind extends React.Component {
    render(){
        return(
            <div id='notFound' className='col-lg-6 mx-auto'>
                <h1>Page non trouvée</h1>
            </div>
        )
    }
}

export default NotFind