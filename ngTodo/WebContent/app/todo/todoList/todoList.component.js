angular.module('todoModule')
.component("todoList", {
	templateUrl: "app//todo/todoList/todoList.component.html",
	controller : function(todoService, $filter, $location){
		var vm = this;
		
		vm.selected = null;
		
		vm.showTable = true;
				
	 	vm.todos = [];
	 	
	 	vm.addTodo = function(newTodo){
	 		var copy = angular.copy(newTodo);
	 		todoService.create(newTodo)
	 		.then(function(red){
	 			vm.reload();
	 		});
	 		vm.newTodo = {};
	 	}
	 	
	 	vm.incompleteTodos = function(){
	 		return $filter('incompleteFilter')(vm.todos).length;
	 	}
	 	
	 	vm.displayTodo = function(todo){
	 		vm.selected = todo;
	 		vm.showTable = false;
	 	}
	 	
	 	vm.displayTable = function(){
	 		vm.selected = null;
	 		vm.showTable = true;
	 	}
	 	
	 	vm.updateTodo = function(todo){
	 		todoService.update(todo)
	 		.then(function(res){
	 			vm.reload();
	 		});
	 	}		  
	 	
	 	vm.deleteTodo = function(todo){
	 		todoService.destroy(todo.id)
	 		.then(function(res){
	 			vm.reload();
	 		});
	 	}
	 	
	 	vm.reload = function(){
	 		todoService.index()
	 		.then(function(res){
	 			vm.todos = res.data;
	 		})
	 		.catch(function(reason){
	 			$location.path('/unauthorized')
	 		});
	 	}
	 	
		vm.warnUser = function() {
			var incompleteTodos = vm.incompleteTodos();
			
			if (incompleteTodos >= 10) return 'red';
			else if (incompleteTodos >= 5) return 'yellow';
			else  return 'green';
		}
	 	
	 	vm.reload();
	},
	controllerAs : "vm"
});