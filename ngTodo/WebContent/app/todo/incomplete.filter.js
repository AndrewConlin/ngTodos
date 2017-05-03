angular.module("todoModule")
.filter('incompleteFilter', function(){
	return function(todos, showAll){
		if(showAll) return todos;
		
		var results = [];
		todos.forEach(function(val, index, arr){
			if(!val.completed) results.push(val);
		});
		
		return results;
	}
})