#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.followingUser) {
    const ufu = await controllers.unfollowUser(options.user, options.followingUser);

    return logger.logJson(ufu);
  } else if (options.topic) {
    const uft = await controllers.unfollowTopic(options.user, options.topic);

    return logger.logJson(uft);
  } else if (options.group) {
    const lg = await controllers.leaveGroup(options.user, options.group);

    return logger.logJson(lg);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-f, --followingUser <userName>', 'unfollow user')
  .option('-t, --topic <topicName>', 'unfollow topic')
  .option('-g, --group <groupName>', 'leave group')
  .action(handler)
  .parse(process.argv);
