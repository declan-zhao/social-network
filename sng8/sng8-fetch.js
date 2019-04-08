#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.followingUser) {
    const ufu = await controllers.getNewPostsFromFollowingUser(options.user, options.followingUser);

    return logger.logJson(ufu);
  } else if (options.topic) {
    const uft = await controllers.getNewPostsFromFollowingTopic(options.user, options.topic);

    return logger.logJson(uft);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-f, --followingUser <userName>', 'get new posts from following user')
  .option('-t, --topic <topicName>', 'get new posts from following topic')
  .action(handler)
  .parse(process.argv);
