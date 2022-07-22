const express = require("express");
const cors = require("cors");

const app = express();
const path = require('path');                    

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./back/models");
const { createPool } = require("mysql2/promise");
db.sequelize.sync({ force: false }).then(() => {
  console.log("NOT drop & resynch");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Lancement du back !!" });
});

require('./back/routes/user.routes')(app);
require('./back/routes/post.routes')(app);
require('./back/routes/comment.routes')(app);
app.use('/images', express.static(path.join(__dirname, './back/images')));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});