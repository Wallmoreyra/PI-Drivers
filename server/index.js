const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

//Cambiar el true a false para que no se borre la DB
conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('PI Driver X_x')
})
}).catch(error => console.error(error))
