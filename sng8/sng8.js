#!/usr/bin/env node

const app = require('commander');
const appInfo = require('../package.json');

app
  .version(appInfo.version, '-v, --version')
  .description(appInfo.description)
  .command('list', 'list all entries in an entity table, such as Users -u, Posts -p, Topics -t or Groups -g').alias('ls')
  .command('show', 'show the relationship a user -u has, such as following users -f, following topics -t or joined groups -g')
  .command('post', 'create a new post with author -u, topic -t and content -c, or respond to a read/own post with author -u, post ID -p and content -c').alias('po')
  .command('follow', 'follow a user with user -u and following user -f, or follow a topic with user -u and topic -t, or join a group with user -u and group name -g').alias('fo')
  .command('unfollow', 'unfollow a followed user with user -u and following user -f, or unfollow a followed topic with user -u and topic -t, or leave an joined group with user -u and group name -g').alias('unfo')
  .command('fetch', 'fetch new posts from following user with user -u and following user -f, or fetch new posts from following topic with user -u and following topic -t').alias('fch')
  .command('read', 'read a specific post with user -u and post ID -p')
  .command('like', 'like a read/own post with user -u and post ID -p')
  .command('unlike', 'unlike a liked post with user -u and post ID -p')
  .command('create', 'create a new user with username -u, email -e, name -n and birth date -b')
  .parse(process.argv);
