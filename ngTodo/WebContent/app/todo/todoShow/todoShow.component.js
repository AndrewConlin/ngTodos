angular.module("todoModule")
.component("todoShow", {
	templateUrl: "app/todo/todoShow/todoShow.component.html" ,
	controller : function($routeParams, $location, todoService){
		var vm = this;
		
		vm.hasParams = false;
		
		vm.editMode = false;
		
		vm.setEditTodo = function(){
			vm.editTodo = angular.copy(vm.todo)
		}
		
		vm.save = function(editTodo){
			if(!vm.hasParams){
				vm.onUpdate({todo: editTodo});
				vm.todo = editTodo;
			}
			else{
				todoService.update(vm.editTodo)
				.then(function(res){
					vm.todo = res.data;
					vm.editMode = false; 
					vm.editTodo = null;
				});
			}
			vm.editMode = false; 
			vm.editTodo = null;
		}
		
		vm.backButton = function(){
			if(vm.hasParams) {
				$location.path('/todos');
			}
			else{
				vm.goBack();
			}
		}
		
		
		if (!vm.todo && parseInt($routeParams.id)) {
			vm.hasParams = true;
			
			todoService.show(parseInt($routeParams.id))
			.then(function(res){
				vm.todo = res.data;
				if(!vm.todo) $location.path('/not-found')
			});
		}
	},
	controllerAs: "vm",
	bindings: {
		todo : "<",
		goBack: "&",
		onUpdate: "&"
	}
});