// const namedb = require('./test_script')
const namedb = require('./search_person')
const name = process.argv.slice(2)[0];
const moment = require('moment');

namedb.lookupName(name, (result) => {
  console.log(`Found ${result.length} person(s) by the name '${name}'`)
  let count = 1;
  result.forEach(function (element) {
    console.log(`- ${count}: ${element.first_name} ${element.last_name}, born '${moment(element.birthdate).format('YYYY-MM-DD')}'`);
    count ++;
  })
  // namedb.clientEnd()



})