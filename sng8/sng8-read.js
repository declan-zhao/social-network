#!/usr/bin/env node

const app = require('commander');
const controllers = require('../controllers.js');
const logger = require('../utils.js');

const handler = async (options) => {
  if (options.postId) {
    const rp = await controllers.readPost(options.user, options.postId);

    return logger.logJson(rp);
  }
};

app
  .option('-u, --user <userName>', 'user')
  .option('-p, --postId <postId>', 'read post')
  .action(handler)
  .parse(process.argv);
