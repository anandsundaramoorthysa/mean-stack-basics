angular.module('studentApp', [])
  .factory('StudentService', function ($http) {
    return {
      getAll: function () {
        return $http.get('/api/students');
      }
    };
  })
  .controller('ListController', function ($scope, StudentService) {
    StudentService.getAll().then(function (response) {
      $scope.students = response.data;
    });
  });
