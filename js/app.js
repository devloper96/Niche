var app = angular.module('app',[]);
app.controller('myCtrl',function($scope) {
	$scope.data = "smit",
	$scope.myvalue = true,
	$scope.update = function(){
		$scope.myvalue = false
	};
	$scope.updatelogo = function(){
		$scope.myvalue = true
	}
	$scope.mystyle = {"color":"white"}
	$scope.mystyle1 = {"color":"white"}
	$scope.mystyle2 = {"color":"white"}
	
	$scope.showalert = function(){
		$scope.mystyle = {"color":"black"}
	}
	$scope.leave = function(){
		$scope.mystyle = {"color":"white"}
	}
	$scope.showalert1 = function(){
		$scope.mystyle1 = {"color":"black"}
	}
	$scope.leave1 = function(){
		$scope.mystyle1 = {"color":"white"}
	}
	$scope.showalert2 = function(){
		$scope.mystyle2 = {"color":"black"}
	}
	$scope.leave2 = function(){
		$scope.mystyle2 = {"color":"white"}
	}
if(window.innerWidth <= 800 || window.innerHeight <= 600) {
		$scope.inlinexyz = "height:50px;width:62px"
		$scope.vis = false
	}
else{
		$scope.inlinexyz = "height:50px;width:150px"
		 $scope.vis = true	
}
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
		$scope.inlinexyz = "height:50px;width:62px"
		$scope.vis = false
	}
	else
	{
			$scope.inlinexyz = "height:50px;width:150px"
		 $scope.vis = true
	}
});

app.controller('bodyCtrl',function($scope) {
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
$scope.Cssclass = "postimg"
if (isMobile) {
 $scope.Cssclass = "mobilePostImg"
 $scope.TitleID = "#PostTitle1Mob"
}
else{
	$scope.Cssclass = "postimg"
	$scope.TitleID = "#PostTitle1PC"
}
if(window.innerWidth <= 800 || window.innerHeight <= 600) {
    $scope.Cssclass = "mobilePostImg"
	$scope.TitleID = "PostTitle1Mob"
} 
else {
		 $scope.Cssclass = "postimg"
		 $scope.TitleID = "PostTitle1PC"
		 
    }
})

app.directive('heart', function() {
    return {
        restrict: 'AE',
        scope: {},
        template: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEklEQVQ4T52Ty43CMBCGZ5wNAm2QoAK2A3zYcI6yjVBCSkgJlEAJNLAo580ldMB2EImgRTw8ZAJG4WFnFZ/sGf/f/PKMEWqrCHyJSCMBmHfpsMIkyzlNgRzs0B0roAER/npJmmkZ8uYvkB8nx42BKCMBl6QSAYLKoSSWoiEIlXAYFcgyJt9Ph4gLINO3jjvTgUdHfK5X1I5umk04id/Uft5LsnVd3LRn10fRmWLx5c+973TaJHiVZy2yg/7yJ24DYC0WoT/zlmnUBlA5KMLPyFHHRes34MpMetUFk6u7zj215To8/xLzHOiLtnmw3bkBmpyYCtwBTBCbuyfAI4TPplGv/kbTY3He1iEjQDupqlg6cwYcocToZP9TRgAAAABJRU5ErkJggg=="/>'
	};
})


