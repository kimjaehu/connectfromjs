const namedb = require('./test_script')
const name = process.argv.slice(2)[0];

namedb.lookupName(name, (result) => {
  console.log(`Found ${result.rowCount} person(s) by the name '${name}'`)
  let count = 1;
  result.rows.forEach(function (element) {
    console.log(`- ${count}: ${element.first_name} ${element.last_name}, born '${element.birthdate}'`);
    count ++;
  })
  namedb.clientEnd()
})