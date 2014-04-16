// Controller for the main page
var mainApp = angular.module('mainApp', ['ngRoute','projectControllers']);

mainApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/projects',{
			templateUrl : '/partials/projectList.html',
			controller  : 'MainController',
		}).
		// anything after : in URL is routeParam
		when('/projects/:projectName',{
			templateUrl : '/partials/projectDetail.html',
			controller  : 'DetailController'
		}).
		otherwise({
			redirectTo: '/projects'
		});
	}]);

