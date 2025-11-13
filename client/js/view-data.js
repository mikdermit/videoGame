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
                   <td class="comment-box">${char.comment}</td></tr>`;
    });

    tableObj.innerHTML = htmlString;
}

retrieveData();
