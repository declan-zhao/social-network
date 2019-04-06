const controllers = require('./controllers.js');
const db = require('./models/index.js');
const logger = require('./utils.js');

async function main() {
  try {
    const users = await controllers.getUsers();
    logger.logJson(users);

    const posts = await controllers.getPosts();
    logger.logJson(posts);

    const topics = await controllers.getTopics();
    logger.logJson(topics);

    const groups = await controllers.getGroups();
    logger.logJson(groups);

    const ft = await controllers.getFollowingTopics('user2');
    logger.logJson(ft);

    const gjg = await controllers.getJoinedGroups('user2');
    logger.logJson(gjg);

    const pc = await controllers.postContent('user4', 'Technology', 'xjb');
    logger.logJson(pc);

    const jg = await controllers.joinGroup('user4', 'Group 4');
    logger.logJson(jg);

    const fot = await controllers.followTopic('user2', 'Business');
    logger.logJson(fot);

    const gnpft = await controllers.getNewPostsFromFollowingTopic('user1', 'Technology');
    logger.logJson(gnpft);

    const nuData = {
      userName: 'nu2',
      email: 'nu2@gg.com',
      name: 'GG2',
      birthDate: new Date(1995, 11, 17)
    };
    const nu = await controllers.createUser(nuData);
    logger.logJson(nu);

    const fou = await controllers.followUser('nu2', 'user1');
    logger.logJson(fou);

    const fu = await controllers.getFollowingUsers('nu2');
    logger.logJson(fu);

    const gnpfu = await controllers.getNewPostsFromFollowingUser('nu2', 'user1');
    logger.logJson(gnpfu);

    const lp = await controllers.likePost('nu2', 1);
    logger.logJson(lp);

    const rp = await controllers.readPost('nu2', 1);
    logger.logJson(rp);

    const rp2 = await controllers.readPost('user4', 7);
    logger.logJson(rp2);

    const resp = await controllers.respondPost('nu2', 7, 'GGGGGGGGGG');
    logger.logJson(resp);

    const rp3 = await controllers.readPost('nu2', 7);
    logger.logJson(rp3);
    await db.sequelize.close();
  } catch (err) {
    logger.logJson(err.message);
  }
}

main();
