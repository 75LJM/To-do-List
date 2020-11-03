function init(){
	//fonction qui vérifie si on est bien connecté ou pas
	firebase.auth().onAuthStateChanged(function(user) {
		//si user existe(on est connecté)
	  if (user) {
	    // User is signed in.
	    console.log(user);
	    console.log('connecté')
	    window.location = "app.html";
	    // ...
	  } else {//sinon(on est pas connecté)
	    // User is signed out.
	    // ...
	    console.log('déconnecté');

	    $('#loader').hide();

	    function createAccount(){
			//alert(1);
			let email,password,password2;

			email = document.getElementById('email').value;//récupération de l'input #email
			password = document.getElementById('password').value;
			password2 = document.getElementById('password2').value;
			//console.log(password + ' ' + email);
			//si password et pasword2 sont identique & password = ""
			if(password === password2 && password == ""){
				alert('Donne toi la peine de mettre un mot de passe!');
			//sinon si password et pasword2 sont identique et que password est inferieur à 6 caractères
			}else if(password === password2 && password.length < 6){
				alert('Un password de 6 caractères est demandé au minimum!');
				document.getElementById('email').value = "";
				document.getElementById('password2').value = "";
				document.getElementById('password').value = "";
			}
			//sinon si password et pasword2 sont identique
			else if(password === password2){
				firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  alert(errorCode);
				  alert(errorMessage);
				  // ...
				});
			//dans les autres cas
			}else{
				alert('Vos mots de passe ne correspondent pas!');
				document.getElementById('email').value = "";
				document.getElementById('password2').value = "";
				document.getElementById('password').value = "";
			}
			
		}
		//récupération dans une variable constante du bouton #create
		const create = document.getElementById('create');
		//console.log(create);
		//au click de create on appelle la fonction createAccount
		create.addEventListener('click',createAccount)
	  }
	});

	
}//fin de init


//au chargement du DOM, la fonction init sera lancée
window.onload = init;