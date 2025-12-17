var chars = [];
var activeChar = 0;

// Define angular app
let app = angular.module("browseDataApp", []);

// Create the controller and populate with the functions needed
app.controller("browseDataCtrl", function ($scope, $http) {
    $scope.get_records = function () {
        $http({
            method: "GET",
            url: libraryUrl + "/get-characters"
        }).then(
            function (res) {
                if (res.data.msg === "SUCCESS") {
                    chars = res.data.data;
                    $scope.obj = chars[activeChar];
                    $scope.showHide();
                }
            },
            function (err) {
                alert(err);
            }
        );
    };
    $scope.get_records();

    $scope.changeData = function (direction) {
        activeChar += direction;
        $scope.obj = chars[activeChar];
        $scope.showHide();
    };

    $scope.showHide = function () {
        $scope.hidePrev = activeChar === 0;
        $scope.hideNext = activeChar === chars.length - 1;
    };
});
