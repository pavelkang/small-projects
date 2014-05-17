var projectControllers = angular.module('projectControllers',[]);

projectControllers.controller('ListController',['$scope','$http',
	function ($scope, $http){
	$http.get('/json/projects.json').success(function (data) {
		// This is the "model" from JSON data
		$scope.projects = data;
		});
		$scope.orderProp = 'language';
	}]);

projectControllers.controller('AccordionDemoCtrl', ['$scope',
function ($scope){
  $scope.oneAtATime = false;
  $scope.groups = [
    {
    }
  ];
  $scope.status = {
  	open1 : true,
  	open2 : true,
  	open3 : true,
    isFirstOpen: true,
    isFirstDisabled: false};
  }]);

projectControllers.controller('DetailController',['$scope','$routeParams','$http',
	function ($scope, $routeParams, $http) { 
		$http.get("/json/" + $routeParams.projectName+'.json').success(function (data){
			$scope.project = data;
		});
	}]);

