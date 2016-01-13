var app = angular.module('app.factory',[])

app.factory('PostService',['$http','Time','$q',function ($http,Time,$q) {
  var Posts = []
  return {
     GetPosts : function(notContainedIn)
     {
      var deferred = $q.defer();
    	$http.get('/GetUserInterests').then(function(response) {
    		var posts = Parse.Object.extend("Posts")
    		var Query = new  Parse.Query(posts)
        console.log(notContainedIn.length)
        Query.containedIn("TargetIntrests",response.data.result)
    		if(notContainedIn.length > 0){
    			var ExistingObjectIds=new Array();
    			for(var i=0;i<notContainedIn.length;i++)
    			{
            console.log(notContainedIn[i].id)
    				ExistingObjectIds[i] = notContainedIn[i].id;
    			}
    			Query.notContainedIn("objectId",ExistingObjectIds)
    		}

    		Query.include("_User")
    		Query.descending("createdAt")
    		Query.limit(5);
    		Query.find({
    			success : function (data) {
    					if(data !=null && data != 'undefined')
              {
    						for(var i=0;i<data.length;i++)
    						{
    							var SinglePost = data[i];
    							SinglePost.Image1Title = SinglePost.get("Image1Title")
    							SinglePost.Image2Title = SinglePost.get("Image2Title")
    							var user = SinglePost.get('By')
    							user.fetch({
    								success:function(myObject) {
    								}
    							});
    							var createdAt = SinglePost.get('createdAt')
    							var timeStamp = Time.GetTimeStamp(createdAt)
    							SinglePost.set('TimeStamp',timeStamp);
    							SinglePost.set("Votes1",SinglePost.get('Punchers1').length)
    							SinglePost.set("Votes2",SinglePost.get('Punchers2').length)
    							Posts.push(SinglePost)
    						}
                deferred.resolve(Posts);
    					}
    					else
              {
					       deferred.reject("No data found")
    					}
    			},
    			error : function (error) {
    				deferred.reject("Error occured : " + error)
    			}
    		})
    	})
      return deferred.promise;
    }
  }
}])


app.factory('Time', function(){
  return {
    GetTimeStamp : function(createdAt)
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
  }
})

app.factory('Model',function(){
  var Value;
  return {
    Value : Value
  }
})

app.factory('Data',function(){
  var Value;
  return {
    Value : Value
  }
})

app.factory('Search',['$q','Time',function($q,Time){
      var SearchAccordingToKeyWord = function(KeyWord){
      var deferred = $q.defer();
      var SearchResults = [];
      KeyWord = KeyWord.replace('#','').trim()
      console.log(KeyWord);
      if(KeyWord != null && KeyWord != 'undefined')
      {
        var SearchInImage1Title = new Parse.Query("Posts")
        SearchInImage1Title.startsWith("Image1Title",KeyWord)
        var SearchInImage2Title = new Parse.Query("Posts")
        SearchInImage2Title.startsWith("Image2Title",KeyWord)
        var FinalQuery = Parse.Query.or(SearchInImage1Title,SearchInImage2Title);
        FinalQuery.find({
          success:function(Posts){
            if(Posts.length > 0)
            {
              for(var i=0;i<Posts.length;i++)
              {
                var SinglePost = Posts[i];
                SinglePost.Image1Title = SinglePost.get("Image1Title")
                SinglePost.Image2Title = SinglePost.get("Image2Title")
                var user = SinglePost.get('By')
                user.fetch({
                  success:function(myObject) {
                  }
                });
                var createdAt = SinglePost.get('createdAt')
                var timeStamp = Time.GetTimeStamp(createdAt)
                SinglePost.set('TimeStamp',timeStamp);
                SearchResults.push(SinglePost)
              }
              deferred.resolve(SearchResults)
            }
            else {
              deferred.reject("No Posts Found")
            }
          },
          error:function(error){
            deferred.reject("OOps it failed")
          }
        })
      }
      return deferred.promise;
    };
    return{
      SearchAccordingToKeyWord : SearchAccordingToKeyWord
    }
}])

app.factory('FetchInterests',['$http','$q',function($http,$q){
  return{
    Fetch : function(){
      console.log("Hear")
      var Query = new Parse.Query("Intrestlist");
      var deferred = $q.defer()
    	$http.get('/GetUserInterests').then(function(response) {
      Query.find({
        success: function(Intersts)
        {
          var data = new Array();
          for(var i=0;i<Intersts.length;i++)
          {
            //response.data.result
            mydata = {id:Intersts[i].id,Text:Intersts[i].get("IntrestText"),has:false}
            for(var j=0;j<response.data.result.length;j++)
            {
                          if(response.data.result[j] == Intersts[i].get("IntrestText"))
                          {
                              console.log("-------------------------True------------------------")
                              mydata.has = true;
                              break;
                          }
                          else
                          {
                            mydata.has = false
                          }
              }
            console.log(mydata)
            data.push(mydata)
          }
          deferred.resolve(data)
        },
        error : function(error)
        {
          deferred.resolve(error)
        }
      })
    })
      return deferred.promise;
    }
  }
}])
