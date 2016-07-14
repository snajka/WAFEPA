var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('ActivityController', function($scope, $location, $routeParams, activityService) {
	
	$scope.getAll = function() {
		
		activityService.getAll($scope.search, $scope.page)  // HTTP GET api/activities
				.success(function(data, status, headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalPages = headers('total-pages');
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});
	};
	
	$scope.remove = function(id) {
		activityService.remove(id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					
				});
	};
	
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
	};
	
	$scope.save = function() {
		activityService.save($scope.activity)
				.success(function() {
					$location.path('/activities');
				})
				.error(function() {
					
				});
	};
});

wafepaApp.controller('UserController', function($scope, $location, $routeParams, userService){
	
	$scope.getAll = function() {
		userService.getAll($scope.search, $scope.page)  // HTTP GET api/activities
				.success(function(data, status, headers) {
					$scope.users = data;
					$scope.hideSpinner = true;
					$scope.totalPages = headers('total-pages');
				})
				.error(function() {
					$scope.hideSpinner = true;
					$scope.showError = true;
				});
	};
	
	$scope.remove = function(id) {
		userService.remove(id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					alert('Error!');
				});
	};
	
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
	};
	
	$scope.save = function() {
		userService.save($scope.user)
				.success(function() {
					$location.path('/users');
				})
				.error(function() {
					
				});
	};
	
});

wafepaApp.service('activityService', function($http) {
	
	this.url = 'api/activities';
	
	this.getOne = function(id) {
		return $http.get(this.url + '/' + id);
	};
	
	this.remove = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	
	this.getAll = function(name, page) {
		return $http.get(this.url, { params: { 'name': name, 'page': page }});
	};
	
	this.save = function(activity) {
		if (activity.id) {
			return $http.put(this.url + '/' + activity.id, activity);
		} else {
			return $http.post(this.url, activity);
		}
	};
});

wafepaApp.service('userService', function($http) {
	
	this.url = 'api/users';
	
	this.getOne = function(id) {
		return $http.get(this.url + '/' + id);
	};
	
	this.remove = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	
	this.getAll = function(name, page) {
		return $http.get(this.url, { params: { 'name': name, 'page': page }});
	};
	
	this.save = function(user) {
		if (user.id) {
			return $http.put(this.url + '/' + user.id, user);
		} else {
			return $http.post(this.url, user);
		}
	};
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller : 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .when('/users', {
            templateUrl : '/static/app/html/partial/users.html',
            controller: 'UserController'
        })
        .when('/users/add', {
            templateUrl : '/static/app/html/partial/addEditUser.html',
            controller: 'UserController'
        })
        .when('/users/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditUser.html',
            controller: 'UserController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);