var wafepaApp = angular.module('wafepaApp.routes', ['ngRoute']);

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
        .when('/countries', {
            templateUrl : '/static/app/html/partial/countries.html',
            controller: 'CountryController'
        })
        .when('/movies', {
            templateUrl : '/static/app/html/partial/movies.html',
            controller: 'MovieController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);