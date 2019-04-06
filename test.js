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

    const lg = await controllers.leaveGroup('user4', 'Group 4');
    logger.logJson(lg);

    const fot = await controllers.followTopic('user2', 'Business');
    logger.logJson(fot);

    const ufot = await controllers.unfollowTopic('user2', 'Business');
    logger.logJson(ufot);

    const gnpft = await controllers.getNewPostsFromFollowingTopic('user1', 'Technology');
    logger.logJson(gnpft);

    const gnpft2 = await controllers.getNewPostsFromFollowingTopic('user2', 'Business');
    logger.logJson(gnpft2);

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

    const ufou = await controllers.unfollowUser('user1', 'user2');
    logger.logJson(ufou);

    const fu = await controllers.getFollowingUsers('nu2');
    logger.logJson(fu);

    const gnpfu = await controllers.getNewPostsFromFollowingUser('nu2', 'user1');
    logger.logJson(gnpfu);

    const lp = await controllers.likePost('nu2', 1);
    logger.logJson(lp);

    const rp = await controllers.readPost('nu2', 1);
    logger.logJson(rp);

    const up = await controllers.unlikePost('nu2', 1);
    logger.logJson(up);

    const rp2 = await controllers.readPost('nu2', 1);
    logger.logJson(rp2);

    const rp3 = await controllers.readPost('user4', 7);
    logger.logJson(rp3);

    const resp = await controllers.respondPost('nu2', 7, 'GGGGGGGGGG');
    logger.logJson(resp);

    const rp4 = await controllers.readPost('nu2', 7);
    logger.logJson(rp4);

    const resp2 = await controllers.respondPost('nu2', 7, 'GGGGGGGGGG');
    logger.logJson(resp2);
  } catch (err) {
    logger.logJson(err.message);
  }
}

main();
