#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.topic) {
    const post = await controllers.postContent(options.user, options.topic, options.content);

    return logger.logJson(post);
  } else if (options.postId) {
    const response = await controllers.respondPost(options.user, options.postId, options.content);

    return logger.logJson(response);
  }
};

app
  .option('-u, --user <userName>', 'author')
  .option('-t, --topic <topicName>', 'create new post on topic')
  .option('-p, --postId <postId>', 'respond to post')
  .option('-c, --content <content>', 'content')
  .action(handler)
  .parse(process.argv);
