var app = angular.module('app.controllers',[]);

app.controller('myCtrl',['$scope','$http',function($scope,$http) {
	$scope.text = "ddd";
	// $scope.Data = Data
	Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
	$http.get('/GetSessionToken')
	.then(function(response) {
		console.log(response.data);
	Parse.User.become(response.data)
	})
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
}])

app.controller('bodyCtrl',function($scope,$http,PostService) {
	$scope.posts = new Array()
	$scope.PostsVisibility = true
	// $scope.Data = Data
	$scope.$watch(function(scope) { return scope.Data.Value },
              function() {console.log("changed = " + $scope.Data.Value);
							if($scope.Data.Value != null && $scope.Data.Value != "" && $scope.Data.Value != String('undefined'))
							GetPosts($scope.Data.Value)
							}
             );
$scope.Posts = PostService.GetPosts(['0VDyVA8UTD']);
console.log($scope.Posts);
 $scope.PostsVisibility = false;
						//spinner
						var spinner = document.getElementById('spinner')
						spinner.style.display = 'none'
						// LoadMore
						var LoadMore = document.getElementById('LoadMore')
						LoadMore.style.display = 'block'

	$scope.openComment = function(index) {
		console.log("df");
		$('#modal1').openModal();
		GetComments($scope.posts[index].id)

	}
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
						if(a.indexOf(objectId) < 0)
						{
							Parse.Cloud.run("TapTap", {which:"1",userObjID:current_user.id,objectId:objectId}, {
								success : function(result) {
									if(result == "INC")
									{
										 $scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
										 a.push(current_user.id)
										 a = uniq(a)
										 $scope.posts[index].set("Punchers1",a)
									}
									else if(result == "Image 1 INC and Image 2 DEC")
									{
											$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
											a.push(current_user.id)
											a = uniq(a)
											$scope.posts[index].set("Punchers1",a)
											$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") - 1)
											var b = $scope.posts[index].get("Punchers2");
											b.splice(b.indexOf(objectId))
											b = uniq(b)
											$scope.posts[index].set("Punchers2",b)

									}

										$scope.$apply()
								},
								error: function(error) {
									console.log(JSON.stringify(error));
								}
							})
						}

				}
				else
				{
					var a = $scope.posts[index].get("Punchers2");
					if(a.indexOf(objectId) < 0)
					{
						Parse.Cloud.run("TapTap", {which:"2",userObjID:current_user.id,objectId:objectId}, {
						success : function(result) {
							if(result == "INC")
							{
								 $scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
								 a.push(current_user.id)
								 a = uniq(a)
								 $scope.posts[index].set("Punchers2",a)
							}
							else if(result == "Image 1 INC and Image 2 DEC")
							{
									$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
									a.push(current_user.id)
									a = uniq(a)
									$scope.posts[index].set("Punchers2",a)
									$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") - 1)
									var b = $scope.posts[index].get("Punchers1");
									b.splice(b.indexOf(objectId))
									b = uniq(b)
									$scope.posts[index].set("Punchers1",b)
							}
								$scope.$apply()
						},
						error: function(error) {
							console.error(error);
						}
					})
				 }
				}
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

$scope.PostComment=function(){
	var objectId = $scope.objectId
	var CommentObj = Parse.Object.extend("Comment")
	var Comment = new CommentObj();
	var Post = {
	__type: 'Pointer',
	className: 'Posts',
	objectId: objectId
	}
	Comment.set("User",Parse.User.current())
	Comment.set("Post",Post)
	Comment.set("comment",$scope.cc)
	if($scope.cc != null && $scope.cc !="undefined")
	{
	Comment.save()
	$scope.comments.push(Comment)
	$scope.cc = null
	// $scope.$apply();
	Materialize.toast('Comment Added successfully', 4000)
	}
	else {
		Materialize.toast('Comment cannot be null', 4000)
	}
}

function GetComments(objectId)
{
			$scope.objectId = objectId
			var Comment = Parse.Object.extend("Comment")
			var CommentQuery = new Parse.Query(Comment);
			var Post = {
			__type: 'Pointer',
			className: 'Posts',
			objectId: objectId
			}
			CommentQuery.equalTo("Post",Post)
			CommentQuery.find({
				success : function (Comments) {
						for(var i=0;i<Comments.length;i++)
						{
							var User = Comments[i].get("User",Parse.User.current())
							User.fetch()
						}
						$scope.comments = Comments
						$scope.$apply()
				},
				error : function (error) {
					console.log(error);
				}
			})
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

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}


app.controller('DetailsController',function($scope,$http,Data) {

	var params = {};
	var User = null;
	if (location.search) {
			var parts = location.search.substring(1).split('&');

			for (var i = 0; i < parts.length; i++) {
					var nv = parts[i].split('=');
					if (!nv[0]) continue;
					params[nv[0]] = nv[1] || true;
			}
	}
	var objectId = params.id
	alert(objectId)
	if(objectId == Parse.User.current().id || objectId == null)
	{
	User = Parse.User.current()
	$scope.Name = Parse.User.current().get("Name")
	$scope.Ninja_name = Parse.User.current().get("Ninja_name")
	$scope.ProfilePicture = Parse.User.current().get("ProfilePicture").url()
	var Follow = document.getElementById('Follow')
	Follow.style.display = 'none'
	}
	else {
		User = new Parse.User();
		User.id = objectId
		User.fetch({
			success : function (usr) {
				console.log("----Name ==" + usr.get("Name"))
				$scope.Name = User.get("Name")
				$scope.Ninja_name = User.get("Ninja_name")
				$scope.ProfilePicture = User.get("ProfilePicture").url()
			}
		})
		CheckIfIamFollowing()
	}

	$scope.isFollowing = "Please wait .."
	GetFollowers()
	GetFollowing()
	$scope.Data = Data
	function GetFollowers()
	{
	$scope.Posts = Data.Value
	var FollowObject = Parse.Object.extend("FollowList")
	var GetFollowersQuery = new Parse.Query(FollowObject)
	GetFollowersQuery.equalTo("Following",User)
	GetFollowersQuery.find({
		success : function (Followers) {
			console.log(Followers.length);
			$scope.Followers = Followers.length
			$scope.$apply()
		}
	})
	}
	function GetFollowing()
	{
	var FollowObject = Parse.Object.extend("FollowList")
	var GetFollowingQuery = new Parse.Query(FollowObject)
	GetFollowingQuery.equalTo("Follower",User)
	GetFollowingQuery.find({
		success : function (Following) {
			console.log(Following.length);
			$scope.Following = Following.length
			$scope.$apply()
		}
	})
	}

	$scope.FollowUnfollowAction = function()
	{
		var FollowType = Parse.Object.extend("FollowList")
		var FollowObject = new FollowType();
		FollowObject.set("Follower",Parse.User.current())
		FollowObject.set("Following",User)
		FollowObject.set("FollowingName",User.get("Name"))
		if($scope.isFollowing == "Follow")
		{
			FollowObject.save({success : function(Object) {
				$scope.objectIdOfFollowObject = Object.id
			}})
			$scope.isFollowing = "Unfollow"
			$scope.icon = "remove"

		}
		else {
			FollowObject = new FollowType();
			var Query = new Parse.Query(FollowType);
			Query.equalTo("objectId",$scope.objectIdOfFollowObject)
			Query.find({
				success:function(Objects) {
					Objects[0].destroy()
				}
			})

			$scope.isFollowing = "Follow"
			$scope.icon = "person_add"
		}
	}

function CheckIfIamFollowing()
{
	var FollowObject = Parse.Object.extend("FollowList")
	var GetFollowingQuery = new Parse.Query(FollowObject)
	GetFollowingQuery.equalTo("Follower",Parse.User.current())
	GetFollowingQuery.find({
		success : function (Following) {
			if(Following.length == 0)
			{
				$scope.isFollowing = "Follow"
				$scope.icon = "person_add"
			}
			for(var i=0;i<Following.length;i++)
			{
				// Unfollow : remove
				// Follow :  person_add
				console.log("Follower = " + Following[i].get("Follower").id + "Following =" + Following[i].get("Following").id);
				if(Following[i].get("Follower").id == Parse.User.current().id && Following[i].get("Following").id == User.id)
				{
					console.log("Yahh is Following");
					$scope.isFollowing = "UnFollow";
					$scope.icon = "remove"
					$scope.objectIdOfFollowObject = Following[i].id;
				}
				else {
					$scope.isFollowing = "Follow"
					$scope.icon = "person_add"
				}
			}
		}
	})
}

})

app.controller('UserPunchesController',function($scope,$http,Data) {
	var params = {};
	var User = null
	if (location.search) {
	    var parts = location.search.substring(1).split('&');

	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;
	        params[nv[0]] = nv[1] || true;
	    }
	}
	var objectId = params.id
	if(objectId == Parse.User.current() || objectId == null)
	{
		User = Parse.User.current();
		alert(User.id)
	}
	else {
		User = new Parse.User();
		User.id = objectId
		User.fetch()
	}

	$scope.posts = new Array()
	$scope.PostsVisibility = true
	$scope.openComment = function(index) {
		console.log("df");
		$('#modal1').openModal();
		GetComments($scope.posts[index].id)

	}
	$scope.LoadMore = function () {
		console.log("clicked");
		//spinner
		var spinner = document.getElementById('spinner')
		spinner.style.display = 'block'
		GetPosts()
	}

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
						if(a.indexOf(objectId) < 0)
						{
							Parse.Cloud.run("TapTap", {which:"1",userObjID:current_user.id,objectId:objectId}, {
								success : function(result) {
									if(result == "INC")
									{
										 $scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
										 a.push(current_user.id)
										 a = uniq(a)
										 $scope.posts[index].set("Punchers1",a)
									}
									else if(result == "Image 1 INC and Image 2 DEC")
									{
											$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") + 1)
											a.push(current_user.id)
											a = uniq(a)
											$scope.posts[index].set("Punchers1",a)
											$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") - 1)
											var b = $scope.posts[index].get("Punchers2");
											b.splice(b.indexOf(objectId))
											b = uniq(b)
											$scope.posts[index].set("Punchers2",b)

									}

										$scope.$apply()
								},
								error: function(error) {
									console.log(JSON.stringify(error));
								}
							})
						}

				}
				else
				{
					var a = $scope.posts[index].get("Punchers2");
					if(a.indexOf(objectId) < 0)
					{
						Parse.Cloud.run("TapTap", {which:"2",userObjID:current_user.id,objectId:objectId}, {
						success : function(result) {
							if(result == "INC")
							{
								 $scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
								 a.push(current_user.id)
								 a = uniq(a)
								 $scope.posts[index].set("Punchers2",a)
							}
							else if(result == "Image 1 INC and Image 2 DEC")
							{
									$scope.posts[index].set("Votes2", $scope.posts[index].get("Votes2") + 1)
									a.push(current_user.id)
									a = uniq(a)
									$scope.posts[index].set("Punchers2",a)
									$scope.posts[index].set("Votes1", $scope.posts[index].get("Votes1") - 1)
									var b = $scope.posts[index].get("Punchers1");
									b.splice(b.indexOf(objectId))
									b = uniq(b)
									$scope.posts[index].set("Punchers1",b)
							}
								$scope.$apply()
						},
						error: function(error) {
							console.error(error);
						}
					})
				 }
				}
	}

function GetPosts(hashTag)
{
		var posts = Parse.Object.extend("Posts")
		var Query = new  Parse.Query(posts)


		Query.equalTo("By",User)

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
		Query.descending("createdAt")
		Query.find({
			success : function (data) {
					Data.Value = data.length
					if(data !=null && data != 'undefined'){
						// $scope.posts=data
						console.log(typeof($scope.post));
						for(var i=0;i<data.length;i++)
						{
							var SinglePost = data[i];
							console.log(JSON.stringify(SinglePost));
							SinglePost.Image1Title = SinglePost.get("Image1Title")
							SinglePost.Image2Title = SinglePost.get("Image2Title")
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

$scope.PostComment=function(){
	var objectId = $scope.objectId
	var CommentObj = Parse.Object.extend("Comment")
	var Comment = new CommentObj();
	var Post = {
	__type: 'Pointer',
	className: 'Posts',
	objectId: objectId
	}
	Comment.set("User",Parse.User.current())
	Comment.set("Post",Post)
	Comment.set("comment",$scope.cc)
	if($scope.cc != null && $scope.cc !="undefined")
	{
	Comment.save()
	$scope.comments.push(Comment)
	$scope.cc = null
	// $scope.$apply();
	Materialize.toast('Comment Added successfully', 4000)
	}
	else {
		Materialize.toast('Comment cannot be null', 4000)
	}
}

function GetComments(objectId)
{
			$scope.objectId = objectId
			var Comment = Parse.Object.extend("Comment")
			var CommentQuery = new Parse.Query(Comment);
			var Post = {
			__type: 'Pointer',
			className: 'Posts',
			objectId: objectId
			}
			CommentQuery.equalTo("Post",Post)
			CommentQuery.find({
				success : function (Comments) {
						for(var i=0;i<Comments.length;i++)
						{
							var User = Comments[i].get("User",Parse.User.current())
							User.fetch()
						}
						$scope.comments = Comments
						$scope.$apply()
				},
				error : function (error) {
					console.log(error);
				}
			})
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

app.config(function($provide) {
	$provide.provider('MathService', function() {
      this.$get = function() {
         var factory = {};

         factory.multiply = function(a, b) {
            return a * b;
         }
         return factory;
      };
   });
})

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{a');
  $interpolateProvider.endSymbol('a}');
}])
