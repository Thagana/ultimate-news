const fs = require('fs');
const fileName = './file.json';
const file = require(fileName);
    
file.APPLICATION_URL = "https://api.ultimatenews.com";
    
fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});