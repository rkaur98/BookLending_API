const Hapi = require("hapi");
const joi = require("joi");
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyAVaWNmciFZ3oWImhy8hSeOfB_vra7erbw",
    authDomain: "booklending-ceacf.firebaseapp.com",
    databaseURL: "https://booklending-ceacf.firebaseio.com",
    projectId: "booklending-ceacf",
    storageBucket: "booklending-ceacf.appspot.com",
    messagingSenderId: "1032794810482"
  };
firebase.initializeApp(config);

var firedata = firebase.database();

const server = new Hapi.Server({
	host: "localhost", 
    port: 3000 
});


server.route([
	{
		method: 'GET',
	    path: '/',
	    handler: function (request, response) {
	        return firebase.database().ref().once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			});
	    }
	},
	{
		method: 'GET',
	    path: '/book/',
	    handler: function (request, response) {
	        return firebase.database().ref('book').once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			});
	    }
	},
	{
		method: 'GET',
	    path: '/book/{index}',
	    handler: function (request, response) {
	        return firedata.ref('book/'+(request.params.index)).once('value').then(function(snapshot) {
	        
			  return (snapshot.val());
			  
			});
	    }
	},
	{
		method: 'GET',
	    path: '/book/genre={index}',
	    handler: function (request, response) {
	        return firedata.ref().child('book').orderByChild('genre').endAt(request.params.index).once('value').then(function(snap){
	        	return(snap.val());
	        });

				
	    }
	},
	{
		method: 'GET',
	    path: '/book/author={index}',
	    handler: function (request, response) {
	        return firedata.ref().child('book').orderByChild('author').endAt(request.params.index).once('value').then(function(snap){
	        	return(snap.val());
	        });

				
	    }
	},
	{
		method: 'GET',
	    path: '/book/title={index}',
	    handler: function (request, response) {
	        return firedata.ref().child('book').orderByChild('title').endAt(request.params.index).once('value').then(function(snap){
	        	return(snap.val());
	        });

				
	    }
	},
	{
		method: 'POST',
	    path: '/book/',
	    handler: function (request, response) {
	    	firedata.ref('book/').push({
		    "title":  request.payload.title,
		    "author":  request.payload.author,
		    "genre" :  request.payload.genre,
		    "publication": {
		    	"date_published" : request.payload.date_published,
		    	"publisher": request.payload.publisher
		    },
		    "availability": request.payload.availability
		  });
	        return firedata.ref('book').once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			});
	    }
	},
	{
		method: 'PUT',
	    path: '/book/{index}',
	    handler: function (request, response) {
	    	firedata.ref('book/'+ (request.params.index)).set({
			    "title":  request.payload.title,
			    "author":  request.payload.author,
			    "genre" :  request.payload.genre,
			    "publication": {
			    	"date_published" : request.payload.date_published,
			    	"publisher": request.payload.publisher
			    },
			    "availability": request.payload.availability
			  });
	        return firedata.ref('book').once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			});
	    }
	},
	{
		method: 'DELETE',
	    path: '/book/{index}',
	    handler: function (request, response) {
	    	firebase.database().ref('book/'+(request.params.index)).remove();
	        return firedata.ref('book').once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			});
	    }
	}
	
]);


server.start((error) => {
	if(error){
		throw error;
	}
	console.log("Server running at "+server.info.uri);
})