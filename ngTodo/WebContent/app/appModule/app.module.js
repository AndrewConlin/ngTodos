angular.module("appModule",["ngRoute", "todoModule", "authModule", "navModule", "staticModule"])
.config(function($routeProvider){
	$routeProvider   
		.when('/', {
	      template : '<home-component></home-component>'
	    })
	    .when('/about', {
	      template : '<about-component></about-component>'
	    })
	    .when('/contact', {
	      template : '<contact-component></contact-component>'
	    })
	    .when('/todos', {
	      template : '<todo-list>Loading Todos...</todo-list>'
	    })
	    .when('/todos/:id', {
	      template : '<todo-show>Loading Todos ID...</todo-show>'
	    })
	    .when('/register', {
	    	template : '<register>Loading Register...</register>'
	    })
	    .when('/unauthorized', {
	    	template : '<not-authorized>Loading auth...</not-authorized>'
	    })
	    .otherwise({
	      template : '<not-found>loading 404</not-found>'
	    })
});