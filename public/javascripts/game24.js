var game24 = angular.module('game24', []);
game24.controller('NumberController', function($scope, $parse){
	$scope.numbers = [1,2,3,4];
	var result = {};
	$scope.$watch('expr', function(newVal, oldVal, scope){
		if (newVal !== oldVal) {
			try{
				var parseFun = $parse(newVal);
				result = parseFun(scope);}
			catch(err){null;}
		}
	});
	$scope.init = function() {
		for (var i=0; i<4; i++){
			$scope.numbers[i] = randomCard();
		}
	};
	$scope.submit = function() {
		if (result==24 && validate($scope.numbers,$scope.expr)) {
			console.log("Correct!");
		}
		else {
			console.log("Wrong!");
		}
	}
});

/* Helper Functions */
var randomCard = function(){
	var interval = 1.0/13;
	var result = parseInt(Math.random()/interval)+1;
	return result;
}

function isDigit(chr) {
    if (chr>="0" && chr<="9") {return true;}
    return false;
}

function array_equal(array1, array2) {
    for (var i=0; i<array1.length; i++) {
	if (array1[i] != array2[i]) {return false;}
    }
    return true;
}

function validate(numbers, response) {
    parsedInts = new Array();
    current_number = "";
    for (var i=0; i<response.length; i++){
	if (isDigit(response[i])) { current_number += response[i];}
	else {
	    if (current_number) {
		parsedInts.push(parseInt(current_number));
		current_number = "";
	    }
	}
    }
    if (current_number) {
	parsedInts.push(parseInt(current_number));
	current_number = "";
    }
    if (parsedInts.length != 4) {return false;}
    if (!array_equal(parsedInts.sort(), numbers.sort())) {return false;}
    return true;
}
