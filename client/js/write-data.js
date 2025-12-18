//1.  Define angular app
var app = angular.module("addCharactersApp", []);

//2.  Create the controller and populate with the functions needed
app.controller("addCharactersCtrl", function ($scope, $http) {
    $scope.addResults = "";

    $scope.clear = function () {
        $scope.name = "";
        $scope.world = "";
        $scope.dataCenter = "";
        $scope.race = "";
        $scope.grandCompany = "";
        $scope.preferredRole = "";
        $scope.preferredClass = "";
        $scope.playstyle = "";
        $scope.platform = "";
        $scope.comment = "";
    };

    $scope.submitCharacter = function () {
        if (
            $scope.name === "" ||
            $scope.world === "" ||
            $scope.dataCenter === "" ||
            $scope.race === "" ||
            $scope.grandCompany === "" ||
            $scope.preferredRole === "" ||
            $scope.preferredClass === "" ||
            $scope.playstyle === "" ||
            $scope.platform === "" ||
            $scope.comment === ""
        ) {
            $scope.addResults = "All fields are required";
            return;
        }

        console.log($scope.name);
        $http({
            method: "POST",
            url: libraryUrl + "/add-spell",
            data: {
                name: $scope.name,
                world: $scope.world.toLowerCase(),
                dataCenter: $scope.dataCenter,
                race: $scope.race,
                grandCompany: $scope.grandCompany,
                preferredRole: $scope.preferredRole,
                preferredClass: $scope.preferredClass,
                playstyle: $scope.playstyle,
                platform: $scope.platform,
                comment: $scope.comment
            }
        }).then(
            function (response) {
                if (response.data.msg === "SUCCESS") {
                    $scope.addResults = "Character is added!";
                    $scope.name = "";
                    $scope.world = "";
                    $scope.dataCenter = "";
                    $scope.race = "";
                    $scope.grandCompany = "";
                    $scope.preferredRole = "";
                    $scope.preferredClass = "";
                    $scope.playstyle = "";
                    $scope.platform = "";
                    $scope.comment = "";
                } else {
                    $scope.addResults = response.data.msg;
                }
            },
            function (response) {
                alert(response);
                console.log("I failed");
            }
        );
    };

    $scope.startNew = function () {
        $scope.addResults = "";
    };

    $scope.addResults = "";
});

// const submitButton = document.getElementById("submit");
// submitButton.addEventListener("click", function (e) {
//     e.preventDefault();

//     let name = document.getElementById("name").value;
//     let world = document.getElementById("world").value;
//     let dataCenter = document.getElementById("dataCenter").value;
//     let race = document.getElementById("race").value;
//     let grandCompany = document.getElementById("grandCompany").value;
//     let preferredRole = document.getElementById("preferredRole").value;
//     let preferredClass = document.getElementById("preferredClass").value;
//     let playstyle = document.getElementById("playstyle").value;
//     let platform = document.getElementById("platform").value;
//     let comment = document.getElementById("comment").value;

//     if (
//     !name ||
//     !world ||
//     !dataCenter ||
//     !race ||
//     !grandCompany ||
//     !preferredRole ||
//     !preferredClass ||
//     !playstyle ||
//     !platform ||
//     !comment
// ) {
//         alert("Please fill in all fields before submitting.");
//         return;
//     }

//     let jsonObj = {
//         name: name,
//         world: world,
//         dataCenter: dataCenter,
//         race: race,
//         grandCompany: grandCompany,
//         preferredRole: preferredRole,
//         preferredClass: preferredClass,
//         playstyle: playstyle,
//         platform: platform,
//         comment: comment
//     };

//     fetch(libraryUrl + "/write-character", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(jsonObj)
//     })
//         .then(res => {
//             if (!res.ok) throw new Error(`Network Error: ${res.statusText}`);
//             return res.json();
//         })
//         .then(data => {
//             alert(data.msg);
//             if (data.msg === "SUCCESS")
//                 document.getElementById("clear").click();
//         })
//         .catch(err => alert(`Error: ${err}`));
// });

// const clearButton = document.getElementById("clear");
// clearButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     document.getElementById("data-form").reset();
// });
