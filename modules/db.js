const loki = require('lokijs');

let instance;
let collections = {};

function init(filePath) {
  instance = new loki(filePath, {autoload: true});
}

function getCollections() {
  return instance.listCollections();
}

function getData(collection) {
  console.log('this is the collection name: ' + collection);
  if(!collections[collection]) {
    collections[collection] = instance.getCollection(collection);
  }
  return collections[collection].find();
}

module.exports = {
  instance,
  init,
  getCollections,
  getData
}