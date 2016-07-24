var wafepaApp = angular.module('wafepaApp.ActivityControllers', []);

wafepaApp.controller('ActivityController', function($scope, $location, $routeParams, activityService) {
	
	$scope.getAll = function() {
		
		activityService.getAll($scope.search, $scope.page, $scope.itemsPerPage, $scope.property, $scope.direction)  // HTTP GET api/activities
				.success(function(data, status, headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalElements = headers('total-elements');
					$scope.totalPages = headers('total-pages');
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});
	}
	
	$scope.remove = function(activity) {
		$scope.deleteMessage = true;
		$scope.activity = activity;
		$scope.confirmDelete = false;
		activityService.remove(activity.id)
				.success(function() {
					$scope.getAll();
					$scope.activityDeleted = true;
					$location.path('/activities')
				})
				.error(function() {
					$scope.activityDeleted = false;
				});
	}
	
	$scope.init = function() {
		$scope.activity = {};
		
		if ($routeParams.id) { // edit stranica
			activityService.getOne($routeParams.id)
					.success(function(data) {
						$scope.activity = data;
					})
					.error(function() {
						
					});
			$scope.editActivity = true;
		}
	}
	
	$scope.save = function() {
		activityService.save($scope.activity)
				.success(function() {
					$location.path('/activities');
				})
				.error(function() {
					
				});
	}
	
	$scope.addLike = function(activity) {
		activity.likes = activity.likes + 1;
		activityService.save(activity)
				.success(function() {
					 $scope.getAll();
				})
				.error(function() {
					
				});
	}
	
	$scope.sortLikes = function () {
		$scope.page=0; 
		$scope.property='likes';
		if ($scope.direction=='DESC') {
			$scope.direction='ASC';
		} else {
			$scope.direction='DESC';
		}
		$scope.getAll();
	}
	
	$scope.currentPage = $scope.page + 1;
	
	$scope.itemsPerPage = 5;
	
	$scope.loadMore = function() {
		if ($scope.activities) {
			oldActivities = $scope.activities;
		} else {
			oldActivities = Array();
		}		
		$scope.page = 1 + $scope.page;
		activityService.getAll($scope.search, $scope.page, $scope.itemsPerPage, $scope.property, $scope.direction) 
				.success(function(data, status, headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalElements = headers('total-elements');
					$scope.totalPages = headers('total-pages');
					newActivities = oldActivities.concat($scope.activities);
					$scope.activities = newActivities;
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});

	}
	
	$scope.getAllActivities = function() {
		
		activityService.getAll($scope.search, -1, $scope.itemsPerPage, $scope.property, $scope.direction)  // HTTP GET api/activities
				.success(function(data) {
					data.push({name:'Running'},
							{name:'Swimmming'},
							{name:'Coding'},
							{name:'Jogging'},
							{name:'Basketball'},
							{name:'Football'},
							{name:'Eating'});
					$scope.allActivities = data;
					$scope.hideSpinner = true;
					
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});

	}	
	
});