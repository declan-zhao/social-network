#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.followingUsers) {
    const users = await controllers.getFollowingUsers(options.user);

    return logger.logJson(users);
  } else if (options.topics) {
    const topics = await controllers.getFollowingTopics(options.user);

    return logger.logJson(topics);
  } else if (options.groups) {
    const groups = await controllers.getJoinedGroups(options.user);

    return logger.logJson(groups);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-f, --followingUsers', 'get following users')
  .option('-t, --topics', 'get following topics')
  .option('-g, --groups', 'get joined groups')
  .action(handler)
  .parse(process.argv);
