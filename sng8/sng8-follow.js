#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.followingUser) {
    const fu = await controllers.followUser(options.user, options.followingUser);

    return logger.logJson(fu);
  } else if (options.topic) {
    const ft = await controllers.followTopic(options.user, options.topic);

    return logger.logJson(ft);
  } else if (options.group) {
    const jg = await controllers.joinGroup(options.user, options.group);

    return logger.logJson(jg);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-f, --followingUser <userName>', 'follow user')
  .option('-t, --topic <topicName>', 'follow topic')
  .option('-g, --group <groupName>', 'join group')
  .action(handler)
  .parse(process.argv);
