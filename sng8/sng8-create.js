#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  const userInfo = {
    userName: options.userName,
    email: options.email,
    name: options.name,
    birthDate: new Date(options.birthDate)
  };
  const cu = await controllers.createUser(userInfo);

  return logger.logJson(cu);
};

app
  .option('-u, --userName <userName>', 'username')
  .option('-e, --email <email>', 'email')
  .option('-n, --name <name>', 'name')
  .option('-b, --birthDate <birthDate>', 'birth date')
  .action(handler)
  .parse(process.argv);
