angular.module("navModule")
.component("navComponent", {
	templateUrl : "app/navModule/navComponent/nav.component.html",
	controller : function(authService){
		var vm = this;
				
		vm.isLoggedIn = function(){
			if(authService.getToken().id){
				return true;
			}
			return false;
		}
	},
	controllerAs: "vm"
});