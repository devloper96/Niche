var app = angular.module('app',[]);

app.controller('myCtrl',function($scope,$http) {
	$scope.text = "ddd";
	Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
	var current_user = Parse.User.current()
	$scope.Name = current_user.get("Ninja_name")
	$scope.ProfilePicture_url = current_user.get("ProfilePicture").url();

		$scope.logout = function() {
			console.log("clicked")
				$http({
					method: 'GET',
						url: '/logout'
						}).then(function successCallback(response) {
						}, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
					});
	};
})

app.controller('bodyCtrl',function($scope,$http) {
	$scope.posts = new Array()
	$scope.PostsVisibility = true
	$scope.LoadMore = function () {
		console.log("clicked");
		//spinner
		var spinner = document.getElementById('spinner')
		spinner.style.display = 'block'
		// LoadMore
		var LoadMore = document.getElementById('LoadMore')
		LoadMore.style.display = 'none'
		GetPosts()
	}
	var LoadMore = document.getElementById('LoadMore')
	LoadMore.style.display = 'none'
	Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
	$http.get('/GetSessionToken')
	.then(function(response) {
		console.log(response.data);
	Parse.User.become(response.data)
	GetPosts()
	})

	$scope.Punch = function(index,which){
			var current_user = Parse.User.current()
			var objectId = $scope.posts[index].id;
				if(which == 1)
				{
						var a = $scope.posts[index].get("Punchers1");
						console.log(a);
						// if(a.indexof(objectId) < 0)
						// {
							Parse.Cloud.run("TapTap", {which:"1",userObjID:current_user.id,objectId:objectId}, {
								success : function(result) {
									if(result == "INC")
									{
										 $scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
									}
									else if(result == "Image 1 INC and Image 2 DEC")
									{
											$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
											$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") - 1)
									}
										$scope.$apply()
								},
								error: function(error) {
									console.log(JSON.stringify(error));
								}
							})
						// }

				}
				else
				{

					Parse.Cloud.run("TapTap", {which:"2",userObjID:current_user.id,objectId:objectId}, {
						success : function(result) {
							if(result == "INC")
							{
								 $scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
							}
							else if(result == "Image 1 INC and Image 2 DEC")
							{
									$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
									$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") - 1)
							}
								$scope.$apply()
						},
						error: function(error) {
							console.error(error);
						}
					})
				// }
				}
	}

function GetPosts()
{
	$http.get('/GetUserInterests').then(function(response) {

		console.log(response.data.result);
		var posts = Parse.Object.extend("Posts")
		var Query = new  Parse.Query(posts)
		Query.containedIn("TargetIntrests",response.data.result)
		if($scope.posts.length > 0){
			console.log("load more");
			var ExistingObjectIds=new Array();
			for(var i=0;i<$scope.posts.length;i++)
			{
				console.log($scope.posts[i].id);
				ExistingObjectIds[i] = $scope.posts[i].id;
			}
			console.log(ExistingObjectIds);
			Query.notContainedIn("objectId",ExistingObjectIds)
		}
		Query.include("_User")
		Query.descending("createdAt")
		Query.limit(5);
		Query.find({
			success : function (data) {
					if(data !=null && data != 'undefined'){
						// $scope.posts=data
						console.log(typeof($scope.post));
						for(var i=0;i<data.length;i++)
						{
							var SinglePost = data[i];
							console.log(JSON.stringify(SinglePost));
							var user = SinglePost.get('By')
							user.fetch({
								success:function(myObject) {
									console.log(JSON.stringify(myObject));
								}
							});

							var createdAt = SinglePost.get('createdAt')
							var timeStamp = GetTimeStamp(createdAt)
							SinglePost.set('TimeStamp',timeStamp);
							SinglePost.set("Votes1",SinglePost.get('Punchers1').length)
							SinglePost.set("Votes2",SinglePost.get('Punchers2').length)
							$scope.posts.push(SinglePost)
						}
						$scope.PostsVisibility = false;
						//spinner
						var spinner = document.getElementById('spinner')
						spinner.style.display = 'none'
						// LoadMore
						var LoadMore = document.getElementById('LoadMore')
						LoadMore.style.display = 'block'
						$scope.$apply()
						console.log($scope.posts.length);
					}
					else {
						console.log("null");
					}
			},
			error : function (error) {
				console.log(error);
			}
		})
	})
}

function GetTimeStamp(createdAt)
{
		var currentDate = new Date()
	var Time;
	if(Math.abs(currentDate.getMonth() - createdAt.getMonth()) == 0)
	{
		if(Math.abs(currentDate.getDay() - createdAt.getDay()) > 7)
		{
			Time = String(parseInt(Math.abs(currentDate.getDay() - createdAt.getDay())) / 7 ) + "W"
		}
		else if (Math.abs(currentDate.getDay() - createdAt.getDay()) > 0)
		{
			Time = String(Math.abs(currentDate.getDay() - createdAt.getDay())) + "d"
		}
		else if (Math.abs(currentDate.getHours() - createdAt.getHours()) > 0){
			Time = String(Math.abs(currentDate.getHours() - createdAt.getHours())) + "h"
		}
		else {
		{
					Time = String(Math.abs(currentDate.getMinutes() - createdAt.getMinutes())) + 'm'
		}
		}
	}
	else {
		Time = String(Math.abs(currentDate.getMonth() - createdAt.getMonth())) + 'M'
	}
	return Time;
}

function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}


})

app.controller("CreatePunch",function($scope){
	$scope.punchit = function(){
				var wait = document.getElementById("wait")
				var PunchModel = document.getElementById("PunchModel")
				wait.style.display = "block"
				var Title = $scope.Title;
				var Image1 = $('#Image1')[0]; //File1
				var Image2 = $('#Image2')[0]; //File2
				var Image1Title = $scope.Image1Title;
				var Image2Title = $scope.Image2Title;
				Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
				var current_user = Parse.User.current()
				var Image1File,Image2File;
				var PostObject = Parse.Object.extend('Posts')
				var Post = new PostObject();
				var Communites = $scope.Communites
				if(Image1.files.length > 0 && Image2.files.length > 0 && Image1Title != null && Image2Title != null && Communites!=null)
				{
						Image1File = new Parse.File("Image1.png",Image1.files[0])
						Image2File = new Parse.File("Image2.png",Image2.files[0])
						Post.set("Title",Title);
						Post.set("Image1",Image1File);
						Post.set("Image2",Image2File);
						Post.set("By",current_user);
						Post.set("Image1Title",Image1Title);
						Post.set("Image2Title",Image2Title);
						Post.set("Punchers1",new Array())
						Post.set("Punchers2",new Array())
						var InterestsArray = Communites.split(",");
						Post.set("TargetIntrests",InterestsArray);
						Post.save(null,{
							success : function (Post) {
										$('#PunchModel').closeModal();
										var $toastContent = $('<span> Posted successfully</span>');
										Materialize.toast($toastContent, 5000);
							},
							error: function (error) {
								var $toastContent = $('<span>'+String(error)+'</span>');
								Materialize.toast($toastContent, 5000);
							}
						});
				}
				else
				{
					var $toastContent = $('<span>Please check and fill all the fields</span>');
					Materialize.toast($toastContent, 5000);
				}
			}

});



app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{a');
  $interpolateProvider.endSymbol('a}');
}]);
