var wafepaApp = angular.module('wafepaApp.UserControllers', ['ngCookies']);

wafepaApp.controller('UserController', function($scope, $location, $cookies, $routeParams, userService){
	
	$scope.getAll = function() {
		userService.getAll($scope.search, $scope.page, $scope.itemsPerPage, $scope.property, $scope.direction, $scope.searchWeb)  // HTTP GET api/activities
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
	
	$scope.viewUser = function(user) {
		$scope.user = user;
		$scope.showUser = !$scope.showUser;
	} 

	$scope.getPage = function() {
		if (!$cookies.get('page')) {
			$scope.page = 0;
			$scope.currentPage = 1;
		} else {		
			$scope.page = parseInt($cookies.get('page'));
			$scope.currentPage = $scope.page + 1;
		}
		$cookies.put('page', $scope.page);
		return $scope.page;
	}	

//	$scope.storePage = function() {
//		$cookies.put('page', $scope.page);
//		$cookies.put('currentPage', $scope.currentPage);
//	}
	
	$scope.changePage = function() {
		$scope.page = $scope.currentPage - 1;
		$cookies.put('page', $scope.page);
		$scope.getAll();
	}
	
//	$scope.setCurrentPage = function() {
//		$scope.currentPage = parseInt($cookies.get('page')) + 1;
//	}
		  
//	$scope.currentPage = parseInt($cookies.get('currentPage'));
	  
	$scope.itemsPerPage = 5;
	
});