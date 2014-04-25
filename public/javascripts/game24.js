var game24 = angular.module('game24', []);
game24.controller('NumberController', function($scope, $parse){
	$scope.numbers = [1,2,3,4];
	var result = 0;
	$scope.expr = "";
	$scope.$watch('expr', function(newVal, oldVal, scope){
		if (newVal !== oldVal) {
			try{
				/*
				var parseFun = $parse(newVal);
				result = parseFun(scope);*/
				result = eval(newVal);
			}
			catch(err){null;}
		}
	});
	
	$scope.init = function() {
		newNumbers = new Array();
		for (var i=0; i<4; i++) {
			newNumbers.push(randomCard());
		}
		$scope.numbers = newNumbers;

		/*
		for (var i=0; i<4; i++){
			$scope.numbers[i] = randomCard();}*/
		for (var i=0; i<4; i++){console.log($scope.numbers[i])}		
	};
	$scope.submit = function() {
		if (result==24 && validate($scope.numbers,$scope.expr)) {
			alert("Correct!");
			console.log("Correct!");
		}
		else {
			console.log("Wrong!");
		}
	}


	$scope.press = function(n) {
	switch (n){
	case 0:
		$scope.expr += ($scope.numbers[0]).toString();
		break;
	case 1:
		$scope.expr += ($scope.numbers[1]).toString();
		break;
	case 2:
		$scope.expr += ($scope.numbers[2]).toString();
		break;
	case 3:
		$scope.expr += ($scope.numbers[3]).toString();
		break;
	case 4:
		$scope.expr += "+";
		break;
	case 5:
		$scope.expr += "-";
		break;
	case 6:
		$scope.expr += "*";
		break;
	case 7:
		$scope.expr += "/";
		break;
	case 8:
		$scope.expr += "(";
		break;
	case 9:
		$scope.expr += ")";
		break;}
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
	numbersCopy = numbers.slice(0); // copy by value
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
    if (!array_equal(parsedInts.sort(), numbersCopy.sort())) {return false;}
    return true;
}
