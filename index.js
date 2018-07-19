const express = require('express');
const program = require('commander');
const path = require('path');
const db = require('./modules/db');

program
  .version('0.1.0')
  .option('-p, --port', 'Viewer port.')
  .option('-f, --file [file]', 'Loki JS DB file path.')
  .parse(process.argv);

const app = express();

app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css/')));
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {
    collections: db.getCollections(),
    results: [],
    cols: []
  });
})

app.get('/:collection', function (req, res) {
  let results = db.getData(req.params.collection);
  let cols = [];
  const item = results[0];
  for( let prop in item)
    cols.push(prop);
  res.render('index', {
    collections: db.getCollections(),
    results,
    cols
  });
})

console.log(program);
console.log(program.file)
if (program.file && program.file.length > 0) {
  app.listen('5000', () => {
    console.log(`Started viewer on port: ${5000}`);
    db.init(program.file);
  });
}
