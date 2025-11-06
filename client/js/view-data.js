const jsonString = `{
  "users": [
    {
      "id": 1,
      "name": "Hoshi Jiro",
      "world": "Faerie",
      "dataCenter": "Aether",
      "race": "Au Ra",
      "grandCompany": "The Maelstrom",
      "preferredRole": "Healer",
      "preferredClass": "Conjurer",
      "playstyle": "Casual Raider",
      "platform": "PC",
      "comment": "Looking for a casual raid group to join on weekends."
    },
    {
      "id": 2,
      "name": "Moon Shady",
      "world": "Faerie",
      "dataCenter": "Aether",
      "race": "Au Ra",
      "grandCompany": "The Order of the Twin Adder",
      "preferredRole": "DPS",
      "preferredClass": "Rogue",
      "playstyle": "Fashionista",
      "platform": "PC",
      "comment": "Looking for all the fashion and glamour."
    },
    {
      "id": 3,
      "name": "Eri Rose",
      "world": "Gilgamesh",
      "dataCenter": "Aether",
      "race": "Lalafell",
      "grandCompany": "The Immortal Flames",
      "preferredRole": "Tank",
      "preferredClass": "Gladiator",
      "playstyle": "Hardcore Raider",
      "platform": "PC",
      "comment": "Looking for a hardcore raid group to join on weekends."
    },
    {
      "id": 4,
      "name": "Alice Smith",
      "world": "Kraken",
      "dataCenter": "Dynamis",
      "race": "Hyur",
      "grandCompany": "The Maelstrom",
      "preferredRole": "DPS",
      "preferredClass": "Thamaturge",
      "playstyle": "Roleplayer",
      "platform": "PC",
      "comment": "Looking for a group to roleplay with."
    },
   {
      "id": 5,
      "name": "Gera Riv",
      "world": "Lamia",
      "dataCenter": "Primal",
      "race": "Elezen",
      "grandCompany": "The Order of the Twin Adder",
      "preferredRole": "Healer",
      "preferredClass": "Conjurer",
      "playstyle": "Casual Raider",
      "platform": "PC",
      "comment": "Looking for a casual raid group to join on weekends."
    }
  ]
}`;

const data = JSON.parse(jsonString);

let tableObj = document.getElementById("dataTable");
const cols = 11;

function populateTable (data) {
  let htmlString = "";

  data.users.forEach(user => {
    htmlString += `<tr><td>${user.id}</td>
                   <td>${user.name}</td>
                   <td>${user.world}</td>
                   <td>${user.dataCenter}</td>
                   <td>${user.race}</td>
                   <td>${user.grandCompany}</td>
                   <td>${user.preferredRole}</td>
                   <td>${user.preferredClass}</td>
                   <td>${user.playstyle}</td>
                   <td>${user.platform}</td>
                   <td class="comment-box">${user.comment}</td></tr>`
  });
  
  tableObj.innerHTML = htmlString;
}

populateTable(data);
