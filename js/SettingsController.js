var app = angular.module('app',['app.controllers','app.factory'])

app.controller("MainController",function($scope){

});

app.controller("InterestsController",['$scope','FetchInterests',function($scope,FetchInterests) {
  var promise = FetchInterests.Fetch()
  promise.then(function(Data){
      $scope.Data = Data
  });
  }]);
