const prettyjson = require('prettyjson');

module.exports = {
  logJson: (json) => console.log(prettyjson.render(json))
};
