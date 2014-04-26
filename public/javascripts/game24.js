var totalTime = 60000;
var game24 = angular.module('game24', []);
game24.factory('Data', function(){
	return {
		isGameOn : false,
		no : "hi",
		numOfSolved : 0,
		clockStyle : {color : "green"}
	};
})
game24.controller('SettingsController', function($scope, Data){
	$scope.data  = Data;
	$scope.startGame = function() {
		Data.isGameOn = true;
		Data.no = "you";
		$scope.panel.startTime = new Date();
	}
	$scope.panel = {
		title:"1 min game",
		remainingTime : totalTime,
		startTime : null,
		currentTime : null
	};
	var updateClock = function() {
		if ($scope.data.isGameOn) {
			$scope.panel.currentTime= new Date();	
			$scope.panel.remainingTime = totalTime - ($scope.panel.currentTime - $scope.panel.startTime);
			if ($scope.panel.remainingTime < totalTime/2) {$scope.data.clockStyle.color="orange";}
			if ($scope.panel.remainingTime < totalTime/10) {$scope.data.clockStyle.color="red";}
		}
	};
	var clockInt = setInterval(function(){$scope.$apply(updateClock);}, 100);
});
game24.controller('NumberController', function($scope, $parse, Data){
	$scope.data = Data;
	$scope.numbers = [1,2,3,4];
	$scope.responseColor = {color:"red"};
	var result = 0;
	$scope.expr = "";
	$scope.feedback="";
	$scope.$watch('expr', function(newVal, oldVal, scope){
		if (newVal !== oldVal) {
			try{
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
	};
	$scope.submit = function() {
		if (result==24 && validate($scope.numbers,$scope.expr)) {
			$scope.responseColor.color = "green";
			$scope.feedback = "Correct!";
			if($scope.data.isGameOn){$scope.data.numOfSolved += 1;}
		}
		else {
			$scope.responseColor.color = "red";
			$scope.feedback = "Wrong!";
		}
		var update = function() {$scope.feedback = "";$scope.expr="";clearInterval(refreshID);$scope.init();}
		var refreshID = setInterval(function(){$scope.$apply(update);}, 1000)
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
		break;
	case 10:
		if ($scope.expr.length!=0){
			$scope.expr = $scope.expr.slice(0,-1);
		}
		break;
	case 11:
		$scope.expr = "";
		break;
	}
	}
});

game24.filter('clockFilter', function(){
	return function(input) {
		if (input > 0) { return (input/1000).toFixed(2);}
		else {return 0.00;}
	};
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
