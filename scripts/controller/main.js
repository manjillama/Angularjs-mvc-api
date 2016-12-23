angular.module('myApp')
  .controller('MainCtrl', ['$scope',function($scope){
      $scope.mainTest = "Main Controller Test Check";
      $scope.greetMsg = "";
      var d = new Date();
      $scope.n = d.getHours();

      if($scope.n>=5 && $scope.n<=12){
          $scope.greetMsg = "Good Morning!!!";
      }else if ($scope.n>=13 && $scope.n<=16) {
          $scope.greetMsg = "Good Afternoon!!!";
      }else if ($scope.n>=17 && $scope.n<=20) {
          $scope.greetMsg = "Good Evening!!!";
      }else if($scope.n>=21 && $scope.n<=24){
        $scope.greetMsg = "Have a great night!!!";
      }else{
        $scope.greetMsg = "Staying late tonight?";
      }
      //console.log($scope.greetMsg);
  }]);
