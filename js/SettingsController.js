var app = angular.module('app',['app.controllers','app.factory'])

app.controller("MainController",function($scope){

});

app.controller("FriendsController",['$scope','GetFacebookFriends','GetFriendsFromInterests',function($scope,GetFacebookFriends,GetFriendsFromInterests){
  var promise = GetFacebookFriends.GetFriends()
  promise.then(function(Data){
    for(var i=0;i<Data.length;i++)
    {
      console.log(Data[i]);
      if(Data[i].isFollowing)
      {
        Data[i].symbol = "remove"
      }
      else {
        Data[i].symbol = "add"
      }
    }
    $scope.FacebookFriends = Data
  })
  GetFriendsFromInterests.GetFriends()
}])

app.controller("InterestsController",['$scope','FetchInterests',function($scope,FetchInterests) {
  var promise = FetchInterests.Fetch()
  promise.then(function(Data){
      $scope.Data = Data
  });
  $scope.change = function(d){
    var InterestProto = Parse.Object.extend("UserIntrest")
    if(!d.has)
    {
      var InterestObject = new InterestProto();
      InterestObject.set("User",Parse.User.current())
      var InterestList = Parse.Object.extend("Intrestlist")
      var InterestListObject = new InterestList();
      InterestListObject.id = d.id;
      InterestObject.set("HisInterest",InterestListObject);
      InterestObject.set("IntrestText",d.Text)
      d.has = true
      InterestObject.save({
        success:function(Object){console.log("Added");},
        error:function(){console.log("Error occured");}
      })
    }
    else {
      d.has = false
      var Query = new Parse.Query(InterestProto)
      Query.equalTo("User",Parse.User.current())
      Query.find({
        success:function(response){
        for(var i=0;i<response.length;i++)
        {
          var SingleObject = response[i];
          if(SingleObject.get("IntrestText") == d.Text)
          {
            SingleObject.destroy({
              error : function(error){console.log(error);}
            })
            break;
          }
        }
      },
      error : function(error)
      {
        console.log(error);
      }
    })
    }
  };
  }]);
