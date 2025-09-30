import data from "../data/view-data.json" with { type: "json" };

const data = require('../data/view-data.json');
console.log(data);
let tableObj = document.getElementById("dataTable");
let htmlString = "<tr>";
const cols = 11;

for (let i = 0; i <= data.length; i++) {
    if (i > 0 && i % cols === 0) {
        htmlString += "</tr><tr>";
    }
    htmlString += `<td>${data[i]}</td>`;
}
htmlString += "</tr>";
tableObj.innerHTML = htmlString;
