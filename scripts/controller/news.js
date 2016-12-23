angular.module('myApp')
  .controller('NewsCtrl', ['$scope',function($scope){
      $scope.test = "News Controller Test Check";
      console.log($scope.test);
  }]);
