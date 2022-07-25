function DeleteProfile(id, headers, isShown = false){
  if (isShown = false){
    return(
    <div id='confirmation'>
      <p>ATTENTION vous êtes sur le point de supprimer un utilisateur.</p><br />
      <p>Êtes-vous sûr de vouloir continuer ?</p>
    <div className="d-flex justify-content-around">
      <p className='confirm'>Oui</p>
      <p className='confirm'>Non</p>
    </div>
    </div>
    )}
    else {
      return false
    }
}

export default DeleteProfile;