function init(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('connecté');
    window.location = 'app.html';
  } else {
    // No user is signed in.
    $('#loader').hide();
    function signIn(){
		let email = $('#email').val();
		let password = $('#password').val();
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert(error.message);
		  console.log(error.errorCode);
		  // ...
		});
	}
	let signInBT = $('#signIn');
	signInBT.click(signIn);

	// let signInBT = document.getElementById('signIn');
	// signInBT.addEventListener('click',signIn);
    console.log('déconnecté');
  }
});




}//fin de init
window.onload = init;