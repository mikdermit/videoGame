//1.  Define angular app
var app = angular.module("viewDataApp", []);

//2.  Create the controller and populate with the functions needed
app.controller("viewDataCtrl", function ($scope, $http) {
    $scope.characters = [];
    $scope.roles = [];

    $scope.get_records = function () {
        $http({
            method: "GET",
            url: libraryUrl + "/get-characters"
        }).then(
            function (response) {
                if (response.data.msg === "SUCCESS") {
                    $scope.characters = response.data.data;
                    $scope.roles = getRoles(response.data.data);
                    $scope.selectedRole = $scope.roles[0];
                } else {
                    console.log(response.data.msg);
                }
            },
            function (response) {
                alert(response);
                console.log("I failed");
            }
        );
    };

    $scope.redrawTable = function () {
        var role = $scope.selectedRole.value;
        console.log("redraw");
        $http({
            method: "GET",
            url: libraryUrl + "/get-charactersByRole",
            params: { preferredRole: role }
        }).then(
            function (response) {
                if (response.data.msg === "SUCCESS") {
                    console.log("here");
                    // spellTableData = response.data.spells;
                    $scope.characters = response.data.data;
                } else {
                    console.log(response.data.msg);
                }
            },
            function (response) {
                alert(response);
                console.log("I failed");
            }
        );
    };

    $scope.deleteCharacter = function (id) {
        console.log(id);
        $http({
            method: "DELETE",
            url: libraryUrl + "/delete-character",
            params: { id: id }
        }).then(
            function (response) {
                if (response.data.msg === "SUCCESS") {
                    $scope.redrawTable();
                } else {
                    console.log(response.data.msg);
                }
            },
            function (response) {
                alert(response);
                console.log("I failed the Delete");
            }
        );
    };

    $scope.editCharacter = function (id) {
        $scope.name = $scope.characters[id].name;
        $scope.world = $scope.characters[id].world;
        $scope.dataCenter = $scope.characters[id].dataCenter;
        $scope.race = $scope.characters[id].race;
        $scope.grandCompany = $scope.characters[id].grandCompany;
        $scope.preferredRole = $scope.characters[id].preferredRole;
        $scope.preferredClass = $scope.characters[id].preferredClass;
        $scope.playstyle = $scope.characters[id].playstyle;
        $scope.platform = $scope.characters[id].platform;
        $scope.comment = $scope.characters[id].comment;
        $scope.hideTable = true;
        $scope.hideForm = false;
    };

    $scope.cancelUpdate = function () {
        $scope.hideForm = true;
        $scope.hideTable = false;
    };

    $scope.updateCharacter = function () {
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
            $scope.addResults = "All fields required";
            return;
        }

        console.log("Character ID check: " + $scope.characterID);

        $http({
            method: "PUT",
            url: libraryUrl + "/update-character",
            data: {
                id: $scope.id,
                name: $scope.name,
                world: $scope.world,
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
                    $scope.hideForm = true;
                    $scope.hideTable = false;

                    $scope.redrawTable();

                    $scope.name = "";
                    $scope.type = "";
                    $scope.effect = "";
                    $scope.counter = "";
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

    $scope.get_records();
});

//A handy function we will use to get the list of types
function getRoles(characterTableData) {
    let roleExists; //This is used to prevent duplicates

    rolesArray = [{ value: "", display: "ALL" }];

    //Loop through the JSON array returned from the server
    for (var i = 0; i < characterTableData.length; i++) {
        //Check to see if the type in the ith record has already been captured
        roleExists = rolesArray.find(function (element) {
            return element.value === characterTableData[i].preferredRole;
        });
        if (roleExists) {
            continue; //If already captured, move on to next element
        } else {
            //If not captured, add the type and uppercase type to the types array
            rolesArray.push({
                value: characterTableData[i].preferredRole,
                display: characterTableData[i].preferredRole.toUpperCase()
            });
        }
    }

    return rolesArray;
}
// function retrieveData() {
//     fetch(libraryUrl + "/get-characters", {
//         method: "GET"
//     })
//         .then(res => {
//             if (!res.ok) throw new Error(`Network Error: ${res.statusText}`);
//             return res.json();
//         })
//         .then(data => {
//             if (data.msg === "SUCCESS" && data.data.length > 0)
//                 populateTable(data.data);
//             else alert("No data available to display.");
//         })
//         .catch(err => {
//             alert(`Error: ${err}`);
//         });
// }

function deleteCharacter(id) {
    fetch(libraryUrl + "/delete-character", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
        .then(res => {
            if (!res.ok) throw new Error(`Network Error: ${res.statusText}`);
            return res.json();
        })
        .then(data => {
            if (data.msg === "SUCCESS") {
                alert("Character deleted successfully.");
                retrieveData();
            } else {
                alert("Error deleting character.");
            }
        })
        .catch(err => {
            alert(`Error: ${err}`);
        });
}

function activateDelete() {
    // Capture all html items tagged with the delete-button class
    const deleteButtons = document.querySelectorAll(".delete-button");
    //Loop through all the deleteButtons and create a listener for each one
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const deleteID = this.getAttribute("data-id"); // <-- from the html button object
            handleDelete(deleteID); //You will write this function.
        });
    });
}

activateDelete();

// function populateTable(data) {
//     let tableObj = document.getElementById("dataTable");

//     let htmlString = "";

//     data.forEach(char => {
//         htmlString += `<tr><td>${char.id}</td>
//                    <td>${char.name}</td>
//                    <td>${char.world}</td>
//                    <td>${char.dataCenter}</td>
//                    <td>${char.race}</td>
//                    <td>${char.grandCompany}</td>
//                    <td>${char.preferredRole}</td>
//                    <td>${char.preferredClass}</td>
//                    <td>${char.playstyle}</td>
//                    <td>${char.platform}</td>
//                    <td class="comment-box">${char.comment}</td>
//                    <td><button class="delete-button" data-id="${char.id}" onClick="activateDelete()">Delete</button></td>`;
//     });

//     tableObj.innerHTML = htmlString;
// }
// retrieveData();
