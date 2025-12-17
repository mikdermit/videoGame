function retrieveData() {
    fetch(libraryUrl + "/get-characters", {
        method: "GET"
    })
        .then(res => {
            if (!res.ok) throw new Error(`Network Error: ${res.statusText}`);
            return res.json();
        })
        .then(data => {
            if (data.msg === "SUCCESS" && data.data.length > 0)
                populateTable(data.data);
            else alert("No data available to display.");
        })
        .catch(err => {
            alert(`Error: ${err}`);
        });
}

function handleDelete(id) {
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

function populateTable(data) {
    let tableObj = document.getElementById("dataTable");

    let htmlString = "";

    data.forEach(char => {
        htmlString += `<tr><td>${char.id}</td>
                   <td>${char.name}</td>
                   <td>${char.world}</td>
                   <td>${char.dataCenter}</td>
                   <td>${char.race}</td>
                   <td>${char.grandCompany}</td>
                   <td>${char.preferredRole}</td>
                   <td>${char.preferredClass}</td>
                   <td>${char.playstyle}</td>
                   <td>${char.platform}</td>
                   <td class="comment-box">${char.comment}</td>
                   <td><button class="delete-button" data-id="${char.id}" onClick="activateDelete()">Delete</button></td>`;
    });

    tableObj.innerHTML = htmlString;
}
retrieveData();
