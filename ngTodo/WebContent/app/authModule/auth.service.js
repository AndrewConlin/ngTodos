angular.module("authModule")
.factory("authService", function($http, $cookies){
	    var service = {};
	    
	    var saveToken = function(user) {
	      // TODO : Store the user's id and email in cookies
	    	
	    	$cookies.put('userId', user.id);
	    	$cookies.put('userEmail', user.email);
	    } 
	    
	    var removeToken = function() {
		      // TODO : Remove both the id and email cookies
		    	
		    	 $cookies.remove('userId');
		    	 $cookies.remove('userEmail');
		}
	    
	    service.getToken = function() {
	      // TODO : Return an object with id and email properties, 
	      // the values are the values of the cookies
	    	
	    	var user = {};
	    	user.id = $cookies.get('userId');
	    	user.email = $cookies.get('userEmail');
	    	
	    	return user;
	    }
	    
	    service.login = function(user) {
	      // TODO : Use the auth/login route to authenticate the user
	      // On success, use saveToken to store the users id/email
	    	
			return $http({
				method : "POST",
				url:"api/auth/login",
				data: user
			}).then(function(res){
				saveToken(res.data);
			})
	    }

	    service.register = function(user) {
	      // TODO : Use the auth/register route to create and authenticate the user
	      // On success, use saveToken to store the users id/email
	    	
			return $http({
				method : "POST",
				url:"api/auth/register",
				data: user
			}).then(function(res){
				saveToken(res.data);
			})
	    }
	    
	    service.logout = function() {
	      // TODO : Use the auth/logout route to remove the users session
	      // On success, use removeToken to remove the id and email cookies
	    	
			return $http({
				method : "POST",
				url:"api/auth/logout"
			}).then(function(res){
				removeToken();
			})
	    }

	    return service;
});