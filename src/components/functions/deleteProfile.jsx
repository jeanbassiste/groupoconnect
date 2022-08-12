import axios from 'axios';
import getCookie from './getCookie';

function DeleteProfile(headers, id){
  let token = getCookie('token');
  axios.put(`http://localhost:8080/api/users/delete/${id}`, {firstName: 'utilisateur', lastName:'supprimé', role: 'deleted'}, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } });
  window.location.href = '/home'

}

export default DeleteProfile;