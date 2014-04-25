/*
  Takes a string of a game 24 answer
  Returns a bool representing the correctness of the answer
  */
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
console.log(validate([4,10,2,9], "10*4-2+9"));
console.log(validate([4,10,2,9], "10*4-2+8"));
//validate([4,2,1],"12");
