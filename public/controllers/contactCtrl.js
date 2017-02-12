let myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    let refresh = function() {
        $http.get('/contact').success(function(response) {
            $scope.contacts = response;
            $scope.contact = '';
        });
    };

    refresh();

    $scope.addContact = function() {
        $http.post('/contact', $scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.remove = function(id) {
        $http.delete('/contact/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        // $http.get('/contact/' + id).success(function(response) {
        //     $scope.contact = response;
        // });

        let contact = $scope.contacts.filter(function(item) {
            return item._id === id;
        })[0];
        $scope.contact = JSON.parse(JSON.stringify(contact)); // this makes a copy of the contact, otherwise you see two-way binding at work with the existing contact

    };

    $scope.update = function() {
        $http.put('/contact/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.contact = '';
    };

}]);
