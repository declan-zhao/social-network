#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.users) {
    const users = await controllers.getUsers();

    return logger.logJson(users);
  } else if (options.posts) {
    const posts = await controllers.getPosts();

    return logger.logJson(posts);
  } else if (options.topics) {
    const topics = await controllers.getTopics();

    return logger.logJson(topics);
  } else if (options.groups) {
    const groups = await controllers.getGroups();

    return logger.logJson(groups);
  }
};

app
  .option('-u, --users', 'list Users entity')
  .option('-p, --posts', 'list Posts entity')
  .option('-t, --topics', 'list Topics entity')
  .option('-g, --groups', 'list Groups entity')
  .action(handler)
  .parse(process.argv);
