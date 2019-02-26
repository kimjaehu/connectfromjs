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
const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const birthDate = process.argv.slice(2)[2];


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

const famousPerson = [
  {first_name: firstName, last_name: lastName, birthdate: birthDate}
]

const knex = require('knex')(client)

knex('famous_people').insert(famousPerson).then(() => console.log("data inserted"))
  .catch((err) => {return console.error("error running query", err)})
  .finally(() => {
  knex.destroy();
});