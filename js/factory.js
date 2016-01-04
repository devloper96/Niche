var app = angular.module('app.factory',[])

app.factory('PostService',['$http',function ($http) {

  console.log("Posts before fn call");
  var Posts = []
function GetPosts(notContainedIn)
{
  console.log("Posts after fn call");
	$http.get('/GetUserInterests').then(function(response) {

		console.log(response.data.result);
		var posts = Parse.Object.extend("Posts")
		var Query = new  Parse.Query(posts)


		Query.containedIn("TargetIntrests",response.data.result)

		if(notContainedIn > 0){
			console.log("load more");
			var ExistingObjectIds=new Array();
			for(var i=0;i<$notContainedIn.length;i++)
			{
				console.log(notContainedIn[i].id);
				ExistingObjectIds[i] = notContainedIn[i].id;
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
							Posts.push(SinglePost)
						}
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
return Posts
}
}])


app.factory('Data', function(PostService){
	var a = PostService.GetPosts(['ssdad']);
  console.log("Data");
  console.log(a)
})
