angular.module("todoModule")
.factory("todoService", function($http, $filter, $location,authService){
	var service = {};
	
	var checkLogin = function(){
		if(!authService.getToken().id){
			$location.path('/');
		}
	}
	
	service.index = function(){
		checkLogin();
		
		return $http({
			method : "GET",
			url:"api/users/" + authService.getToken().id +"/todos"
		})
	}
	
	service.show = function(id){
		checkLogin();

		return $http({
			method : "GET",
			url:"api/users/"+ authService.getToken().id + "/todos/" +id
		})
	}
	
	service.create = function(todo){
		checkLogin();

		todo.completed = false;
		todo.description = '';
		
		return $http({
			method : "POST",
			url:"api/users/"+ authService.getToken().id +"/todos",
			data: todo
		})	
	}
	
	service.update = function(todo){
		checkLogin();

		if(todo.completed) {
			todo.completeDate = $filter('date')(Date.now(), 'MM/dd/yyyy'); // 8/24/1999
		}
		else {
			todo.completeDate = "";
		}

		return $http({
			method : "PUT",
			url:"api/users/"+ authService.getToken().id +"/todos/" + todo.id,
			data: todo
		})	
	}
	
	service.destroy = function(id){
		checkLogin();

		return $http({
			method : "DELETE",
			url:"api/users/"+ authService.getToken().id +"/todos/"+id
		})	
	}
 	
	return service;
});