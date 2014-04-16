var projectControllers = angular.module('projectControllers',[]);

projectControllers.controller('MainController',['$scope','$http',
	function ($scope, $http){
	$http.get('/json/projects.json').success(function(data){
		// This is the "model" from JSON data
		$scope.projects = data;
		});
		$scope.orderProp = 'name';
	}]);

projectControllers.controller('DetailController',['$scope','$routeParams','$http',
	function ($scope, $routeParams, $http) { 
		$http.get("/json/" + $routeParams.projectName+'.json').success(function (data){
			$scope.project = data;
		});
	}]);

