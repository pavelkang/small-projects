var projectControllers = angular.module('projectControllers',[]);

projectControllers.controller('ListController',['$scope','$http',
	function ($scope, $http){
	$http.get('/json/projects.json').success(function (data){
		// This is the "model" from JSON data
		$scope.projects = data;
		});
		$scope.hello = function(name) {
			alert("hello: " + (name || "world"));
		}
		$scope.orderProp = 'language';
	}]);

projectControllers.controller('DetailController',['$scope','$routeParams','$http',
	function ($scope, $routeParams, $http) { 
		$http.get("/json/" + $routeParams.projectName+'.json').success(function (data){
			$scope.project = data;
		});
		$scope.imgUrl = "http://www.personal.psu.edu/jul229/mini.jpg";
		
		$scope.myClick = function(name){
			console.log("You clicked Angularjs!");
			$scope.imgUrl = "https://www.google.com/images/srpr/logo11w.png";	
		};
		$scope.hello = function(name) {
			alert("hello: " + (name || "world"));
		}
	}]);

