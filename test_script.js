const pg = require("pg");
const settings = require("./settings"); // settings.json

const name = process.argv.slice(2)[0];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  client.query(`SELECT first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate FROM famous_people WHERE first_name = $1::text`, [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rowCount} person(s) by the name '${name}'`)
    let count = 1;
    result.rows.forEach(function (element) {
      console.log(`- ${count}: ${element.first_name} ${element.last_name}, born '${element.birthdate}'`);
      count ++;
    })
    client.end();
  });
});
