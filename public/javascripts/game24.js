var randomCard = function(){
	var interval = 1.0/13;
	var result = parseInt(Math.random()/interval)+1;
	return result;
}

var game24 = angular.module('game24', []);
game24.controller('NumberController', function($scope, $parse){
	$scope.numbers = [1,2,3,4];
	var result = {};
	$scope.$watch('expr', function(newVal, oldVal, scope){
		if (newVal !== oldVal) {
			try{
				var parseFun = $parse(newVal);
				console.log(parseFun);
				result = parseFun(scope);
				console.log("answer is "+result);}
			catch(err){null;}
		}
	});
	$scope.init = function() {
		for (var i=0; i<4; i++){
			$scope.numbers[i] = randomCard();
		}
	};
	$scope.submit = function() {
		console.log("submitting...");
		if (result==24) {
			console.log("Correct!");
		}
		else {
			console.log("Wrong!");
		}
	}
});