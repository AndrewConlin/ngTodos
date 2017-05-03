angular.module("productModule")
.component("productList", {
	templateUrl : "app/productModule/productList/productList.component.html",
    controller : function(productService) {
      var vm = this;
      
      vm.list = productService.index();
      
      vm.count = function(){
    	  return vm.list.length;
      }
  
      vm.log = function(msg){
    	  console.log(msg);
      }
      
      vm.addProduct = function(product){
    	  var copy = angular.copy(product);
    	  productService.create(copy);
    	  vm.product = {};
      }
    },
    controllerAs: 'vm'
});