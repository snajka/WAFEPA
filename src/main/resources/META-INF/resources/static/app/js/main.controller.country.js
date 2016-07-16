var wafepaApp = angular.module('wafepaApp.CountryControllers', []);

wafepaApp.controller('CountryController', function($scope, $http){
	
	$scope.getAll = function() {
		$http.get('https://restcountries.eu/rest/v1/all')
				.success(function(data) {
					$scope.countries = data;
				})
				.error(function() {
					alert('Error!');
				});
	};
	
});