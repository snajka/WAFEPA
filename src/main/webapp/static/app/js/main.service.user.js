var wafepaApp = angular.module('wafepaApp.UserServices', []);

wafepaApp.service('userService', function($http) {
	
	this.url = 'api/users';
	
	this.getOne = function(id) {
		return $http.get(this.url + '/' + id);
	}
	
	this.remove = function(id) {
		return $http.delete(this.url + '/' + id);
	}
	
	this.getAll = function(name, page, itemsPerPage, property, direction, searchWeb) {
		return $http.get(this.url, { params: { 'name': name, 'page': page, 'itemsPerPage': itemsPerPage, 'property': property, 'direction': direction, 'searchWeb': searchWeb }});
	}
	
	this.save = function(user) {
		if (user.id) {
			return $http.put(this.url + '/' + user.id, user);
		} else {
			return $http.post(this.url, user);
		}
	}
});