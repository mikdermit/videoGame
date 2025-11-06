const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/client', express.static(path.resolve(__dirname + '/../client/')));

const PORT = 5000;

let router = require('./router.js');
router(app);

let services = require('./services.js');
services(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});