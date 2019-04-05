const Sequelize = require('Sequelize');
const mysqlConfig = require('../mysql-config.json');

const sequelize = new Sequelize(mysqlConfig);

let db = {
  User: require('./users.js')(sequelize, Sequelize),
  Post: require('./posts.js')(sequelize, Sequelize),
  Topic: require('./topics.js')(sequelize, Sequelize),
  Group: require('./groups.js')(sequelize, Sequelize)
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
