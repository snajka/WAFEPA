var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('ActivityController', function($scope, $http, $location, $routeParams, activityService) {
	
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

wafepaApp.controller('UserController', function($scope, $http, $location, $routeParams){
	
	$scope.getAll = function() {
		$http.get('api/users')
				.success(function(data) {
					$scope.users = data;
					$scope.hideSpinner = true;
				})
				.error(function() {
					$scope.hideSpinner = true;
					$scope.showError = true;
				});
	};
	
	$scope.remove = function(id) {
		$http.delete('api/users/' + id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					alert('Error!');
				});
	};
	
	$scope.init = function() {
		$scope.user = {};
		
		if ($routeParams.id) {  
			$http.get('api/users/' + $routeParams.id)
					.success(function(data) {
						$scope.user = data;
					})
					.error(function() {
						alert('Error!');
					});
			$scope.editUser = true;
		};
	};
	
	$scope.save = function() {
		if ($scope.user.id) {
			$http.put('api/users/' + $scope.user.id, $scope.user)
					.success(function() {
						$location.path('/users');
					})
					.error(function() {
						alert('Error!');
					});
		} else {
			$http.post('api/users', $scope.user)
					.success(function() {
						$location.path('/users');
					})
					.error(function() {
						alert('Error!');
					});
		}
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