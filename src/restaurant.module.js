(function() {

/**
 * Restaurant module that includes the public module as a dependency
 */
angular.module('restaurant', ['public'])
.controller('abcd',abcd)

function abcd($scope,$http){
	$scope.message=" "
	$scope.object=[]
	$scope.pr=[]
	$scope.abc="wert"
	$scope.num=0

	$scope.submit=function(firstname,lastname,email,phone,menu){
	 $scope.num=1
	 var short=[]
	 var virat=[]
	 var promise= $http({
	 	method:'GET',
	 	url: 'https://davids-restaurant.herokuapp.com/categories.json'
	 })
	 promise.then(function(response){
	 	var p=response.data
	 	for(var i=0;i<p.length;i++)
	 	{
	 		short.push(p[i].short_name)
	 	}
	 	if(short.indexOf(menu)==-1){
	 		$scope.message="No such menu number exists"
	 	}else{
	 		$scope.message="Your information has been saved"
	 		virat.push(firstname)
	 		virat.push(lastname)
	 		virat.push(email)
	 		virat.push(phone)
	 		virat.push(menu)
	 		console.log(virat)
	 		$scope.pr=virat
	 		console.log($scope.pr)
	 		console.log($scope.pr[0])
	 	}



	 })	


	}
}
})();
