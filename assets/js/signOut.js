$(()=>{//equivalent de window.onload en jQuery

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('connecté');
      $('#loader').hide();
      function signOut(){
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert('Vous venez de vous déconnecter');
      }).catch(function(error) {
        // An error happened.
        alert(error);
      });
      }
      let signOutBT = document.getElementById('signOut');
      signOutBT.addEventListener('click',signOut);
      // ...
    } else {
      // User is signed out.
      // ...
      console.log('déconnecté');
    }
  });
});//fin de document.ready


