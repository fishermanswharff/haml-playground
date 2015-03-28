'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var app = angular.module('hamlApp',['ngRoute','ngSanitize']);

app.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .when('/posts',{
    templateUrl: 'views/posts.html',
    controller: 'PostsController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);


/* Posts Controller */
app.controller('PostsController',postsController);
postsController.$inject = ['$http'];
function postsController($http){
  var vm = this;

  vm.posts = [];

  vm.getPosts = function(){
    $http.get('http://jwdotcom.herokuapp.com/posts').success(function(response){
      trace('getting posts from jwdotcom', response);
      angular.copy(response,vm.posts);
      vm.getTotal();
    }).error();
  };

  vm.getTotal = function(){
    return vm.posts.length;
  };

  vm.getPosts();
}

/* Home Controller */
app.controller('HomeController', homeController);
homeController.$inject = [];
function homeController(){
  trace('hello world from the home controller');
}