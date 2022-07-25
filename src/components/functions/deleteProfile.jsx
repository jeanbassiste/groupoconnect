import axios from 'axios';

function DeleteProfile(headers, id){
  axios.put(`http://localhost:8080/api/users/delete/${id}`, {firstName: 'utilisateur', lastName:'supprimé', role: 'deleted'}, {headers});
  window.location.href = '/home'

}

export default DeleteProfile;