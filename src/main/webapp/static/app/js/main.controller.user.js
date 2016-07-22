var wafepaApp = angular.module('wafepaApp.UserControllers', []);

wafepaApp.controller('UserController', function($scope, $location, $routeParams, userService){
	
	$scope.getAll = function() {
		userService.getAll($scope.search, $scope.page, $scope.itemsPerPage, $scope.property, $scope.direction)  // HTTP GET api/activities
				.success(function(data, status, headers) {
					$scope.users = data;
					$scope.hideSpinner = true;
					$scope.totalElements = headers('total-elements');
					$scope.totalPages = headers('total-pages');
				})
				.error(function() {
					$scope.hideSpinner = true;
					$scope.showError = true;
				});
	}
	
	$scope.remove = function(id) {
		userService.remove(id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					alert('Error!');
				});
	}
	
	$scope.init = function() {
		$scope.user = {};
		
		if ($routeParams.id) { // edit stranica
			userService.getOne($routeParams.id)
					.success(function(data) {
						$scope.user = data;
					})
					.error(function() {
						
					});
			
			$scope.editUser = true;
		};
	}
	
	$scope.save = function() {
		userService.save($scope.user)
				.success(function() {
					$location.path('/users');
				})
				.error(function() {
					
				});
	}
	
	$scope.currentPage = $scope.page + 1;
	
	$scope.itemsPerPage = 5;
	
});