angular.module("productModule")
.component("productCard", {
	templateUrl : "app/productModule/productCard/productCard.component.html",
	controller : function(){
		var vm = this;
		
	},
  controllerAs : 'vm',
  bindings : {
    product : '<'
  }
});