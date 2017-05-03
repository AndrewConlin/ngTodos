angular.module("productModule")
.component("newProduct", {
	templateUrl : "app/productModule/newProduct/newProduct.component.html",
	controller : function(){
		var vm = this;
		
	},
  controllerAs : 'vm',
  bindings : {
    onCreate : '&'
  }
});