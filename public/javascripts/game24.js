var randomCard = function(){
	var interval = 1.0/13;
	var result = parseInt(Math.random()/interval)+1;
	console.log(result);
	return result;
}

var game24 = angular.module('game24', []);
game24.controller('NumberController', function($scope){
	$scope.numbers = [1,2,3,4];
	$scope.init = function() {
		for (var i=0; i<4; i++){
			$scope.numbers[i] = randomCard();
		}
	};
});