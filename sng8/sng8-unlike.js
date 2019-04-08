#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.postId) {
    const rp = await controllers.unlikePost(options.user, options.postId);

    return logger.logJson(rp);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-p, --postId <postId>', 'unlike post')
  .action(handler)
  .parse(process.argv);
