var ourTodo = angular.module('ourTodo', ['ourTodoFilters']);
function MainController($scope, $http) {
	$scope.formData = {"role":"lp"};
	$http.get('/api/todos')
	.success(function(data){
		$scope.todos = data;
	})
	.error(function(err){
		console.log("find error" + err);
	});

	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {"role":"lp"};
			$scope.todos = data;
		})
		.error(function(err){
			console.log("create error"+ err);
		});
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data){
			$scope.todos = data;
		})
		.error(function(err){
			console.log("delete error "+ err);
		});
	};
}

