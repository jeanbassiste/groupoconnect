import { confirmAlert } from 'react-confirm-alert'; 
//import 'react-confirm-alert/src/react-confirm-alert.css';

function DeleteProfile(id, headers){
    confirmAlert({
        title: 'Confirmation de suppression',
        message: "Êtes-vous sûr de vouloir supprimer l'utilisateur ?",
        buttons: [
          {
            label: 'Oui',
            onClick: () => {
                alert('Click Yes');
                console.log('oui')
            }
          },
          {
            label: 'Non',
            onClick: () => {
                alert('Click No');
                console.log('non')
            }
          }
        ]
      })


}

export default DeleteProfile;