module.exports = (function() {

  const pg = require("pg");
  const settings = require("./settings"); // settings.json
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
  });
  
  function lookupName(name, callback) {
    console.log("Searching...")
    client.query(`SELECT first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate FROM famous_people WHERE first_name = $1::text`, [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      callback(result)
    })
  }

  function clientEnd() {
    client.end();
  }

  return {
    lookupName: lookupName,
    clientEnd: clientEnd
  }

})()