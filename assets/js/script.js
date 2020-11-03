function init(){

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  
    let uid = user.uid;
   	console.log('connecté');

   	function createLi(item, key){
		let li = document.createElement("li");
    	let txt = document.createTextNode(item);
    	li.className = "list-group-item";

    	let span = document.createElement("SPAN");
	    let x = document.createTextNode("\u00D7");
	    span.className = "close";
	    span.appendChild(x);
	    span.setAttribute('data-item', key);
	    li.appendChild(txt);
	    li.appendChild(span);
	    let ul = document.getElementById('myUL');
	    ul.appendChild(li);
    	//console.log(li);
}

	firebase.database().ref(uid + '/list/').on('value', function(snapshot) {
	  document.getElementById('myUL').innerHTML = "";
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    //console.log(childKey);
	    //console.log(childData.item);
	    let item = childData.item;
	    createLi(item,childKey);
	    // ...
	  });
	  function allCloses(){
	    	let closes = document.getElementsByClassName("close");

			for (let i = 0; i < closes.length; i++) {
				console.log(closes[i]);
			  closes[i].addEventListener('click', function() {
			  	let dataItem = this.getAttribute("data-item");
			  	firebase.database().ref(uid + '/list/' + dataItem).remove();
			  	console.log(dataItem);
			    //let li = this.parentElement;
			    //li.style.display = "none";
			  });
			}
		}
		allCloses();

		document.getElementById('loader').setAttribute('style','display:none');
	});//fin de on sur BDD

	function createItem(){
		//alert('ok');
		//$('#loader').show();
		document.getElementById('loader').removeAttribute('style');
		document.getElementById('loader').setAttribute('style','display:block');
		const item = document.getElementById('item').value;
		firebase.database().ref(uid + '/list/').push({
		    'item':item
		  });
		//console.log(item);
	}

	let addItem = document.getElementById('addItem');
	addItem.addEventListener('click', createItem);
    // ...
  } else {
    // User is signed out.
    // ...
    window.location = 'signIn.html';
    console.log('déconnecté');
  }
});








}//fin de init


window.onload = init;