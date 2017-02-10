var ngApp = angular.module('githubSearchApp', ["ngRoute"]);

ngApp.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl : "pages/home.html",
        controller  : 'searchController'
    })
    .when("/user/:login", {
        templateUrl : "pages/user.html",
        controller  : "userController"
    })
});

ngApp.controller('searchController', function ($scope) {
    $scope.title = "Github users search";    
    $scope.searchResult = [];


    $scope.searchGithubEvent = function($event){
    	var self = this;
	    
	    $.get('https://api.github.com/search/users?q=' + $event.target.value, function(response){
	      	$scope.searchResult = response.items;
	      	$scope.$apply();
	    });
    };  
});

ngApp.controller('userController', function($scope, $routeParams){

	$scope.title = "Github user details";
	$scope.userinfo = {};
	$scope.userrepos = [];

	$.get("https://api.github.com/users/"+ $routeParams.login, function(response){

		$scope.userinfo = response;
		$scope.$apply();

		$.get(response.repos_url, function(response){
			$scope.userrepos = response;
			$scope.$apply();			
		});
	});
});