var wafepaApp = angular.module('wafepaApp.MovieControllers', []);

wafepaApp.controller('MovieController', function($scope, $http){
	
	$scope.getMovies = function() {
		$http.get('http://api.themoviedb.org/3/search/movie', { params: { 'api_key': '60e43150ec941092f1ba878f50329062', 'query': $scope.query, 'year': $scope.year}})
				.success(function(data) {
					$scope.movies = data.results;
				})
				.error(function() {
					alert('Error!');
				});
	};
	
});