// Custom filter for ourTODO
angular.module('ourTodoFilters', []).filter("color", function(){
	return function(input) {
		if (input==="lg") {
			return "blue";
		}
		else
			return "red";
	};
})
.filter("lgorlp", function(){
	return function(input) {
		if (input==="lg") {
			return "老公";
		}
		else
			return "老婆";
	};
});