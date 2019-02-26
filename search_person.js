const settings = require("./settings"); // settings.json
// const knex = require("knex")({
//   client: 'pg',
//   connection:{
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
//   }
// });

const client = {
  client: 'pg',
  connection:{
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
};

const knex = require('knex')(client)

// knex.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
// });

function lookupName(name, callback) {
  console.log("Searching...")
  // (`SELECT first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate FROM famous_people WHERE first_name = $1::text`, [name], (err, result) => {

  knex.from('famous_people').select('first_name','last_name', 'birthdate').where("first_name", name)
    .then(callback)
    .catch((err) => {return console.error("error running query", err)})
    .finally(() => {
      knex.destroy();
    })
}

module.exports = {lookupName: lookupName}