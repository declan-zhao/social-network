const db = require('./models/index.js');
const Op = db.Sequelize.Op;

const createSampleData = async () => {
  try {
    // sync database
    await db.sequelize.sync({
      force: true
    });

    // users
    await db.User.bulkCreate([{
      userName: 'admin',
      email: 'admin@sn.com',
      name: 'admin',
      birthDate: new Date(1980, 6, 20)
    }, {
      userName: 'user1',
      email: 'user1@sn.com',
      name: 'user1',
      birthDate: new Date(1981, 7, 21)
    }, {
      userName: 'user2',
      email: 'user2@sn.com',
      name: 'user2',
      birthDate: new Date(1982, 8, 22)
    }, {
      userName: 'user3',
      email: 'user3@sn.com',
      name: 'user3',
      birthDate: new Date(1983, 9, 23)
    }, {
      userName: 'user4',
      email: 'user4@sn.com',
      name: 'user4',
      birthDate: new Date(1984, 10, 24)
    }, {
      userName: 'user5',
      email: 'user5@sn.com',
      name: 'user5',
      birthDate: new Date(1985, 11, 25)
    }], {
      validate: true
    });

    // topics
    await db.Topic.bulkCreate([{
      topicName: 'Technology'
    }, {
      topicName: 'Business'
    }, {
      topicName: 'Sports'
    }, {
      topicName: 'Music'
    }, {
      topicName: 'Fashion'
    }, {
      topicName: 'Politics'
    }], {
      validate: true
    });

    // groups
    await db.Group.bulkCreate([{
      groupName: 'Group 1',
      createdBy: 2
    }, {
      groupName: 'Group 2',
      createdBy: 2
    }, {
      groupName: 'Group 3',
      createdBy: 2
    }, {
      groupName: 'Group 4',
      createdBy: 3
    }, {
      groupName: 'Group 5',
      createdBy: 3
    }, {
      groupName: 'Group 6',
      createdBy: 4
    }], {
      validate: true
    });

    // posts
    await db.Post.bulkCreate([{
      userId: 2,
      content: 'This is post #1. The artist explodes in a slice. Near the platform waits the pleased well. The shirt beams the limb outside a hated constraint. A sector flowers after a competitive focus. A mystery hums opposite its populace.',
      type: 'text'
    }, {
      userId: 3,
      content: 'This is post #2. The delayed leisure consumes a lighted controller. The gang works a practical treasure. An upset consumer dashes behind the integrated predecessor. The upward voltage scores.',
      type: 'text'
    }, {
      userId: 4,
      content: 'This is post #3. The behind employer suffers next to the clothed cliff. The yeti rolls after a north. When can the displayed harden mature outside the anecdote? An indicator braves an adventure.',
      type: 'text'
    }, {
      userId: 4,
      content: 'This is post #4. The psychologist puzzles? Does the diet stretch the lunatic? A dust returns around the enemy. The resigned mechanism hunts near the newest invalid. A constitutional knights the bitmap.',
      type: 'text'
    }, {
      userId: 5,
      content: 'This is post #5. A vocal boggles next to the unconvincing worship. Without the origin hopes the unifying collar. The attractive gateway captures the nest. His sales philosophy prosecutes. A bush results on top of a conference!',
      type: 'text'
    }, {
      userId: 5,
      content: 'This is post #6. How can a cash clog above the medium bath? A religious jet gowns the sentient. My priced fog mends. A neutral lisp promises the menu.',
      type: 'text'
    }], {
      validate: true
    });

    // GroupsUsers
    // add user 2 to group 1, 2, 3
    let user = await db.User.findByPk(2);
    let groups = await db.Group.findAll({
      where: {
        groupId: {
          [Op.gte]: 1,
          [Op.lte]: 3
        }
      }
    });
    await user.addGroups(groups);

    // add user 3 to group 3, 4, 5
    user = await db.User.findByPk(3);
    groups = await db.Group.findAll({
      where: {
        groupId: {
          [Op.gte]: 3,
          [Op.lte]: 5
        }
      }
    });
    await user.addGroup(groups);

    // add user 4 to group 4, 5, 6
    user = await db.User.findByPk(4);
    groups = await db.Group.findAll({
      where: {
        groupId: {
          [Op.gte]: 4,
          [Op.lte]: 6
        }
      }
    });
    await user.addGroup(groups);

    // UsersTopics
    // add user 2 to topic 1
    user = await db.User.findByPk(2);
    let topics = await db.Topic.findAll({
      where: {
        topicId: 1
      }
    });
    await user.addTopics(topics);

    // add user 3 to topic 3, 4, 5
    user = await db.User.findByPk(3);
    topics = await db.Topic.findAll({
      where: {
        topicId: {
          [Op.gte]: 3,
          [Op.lte]: 5
        }
      }
    });
    await user.addTopics(topics);

    // add user 4 to topic 4, 5, 6
    user = await db.User.findByPk(4);
    topics = await db.Topic.findAll({
      where: {
        topicId: {
          [Op.gte]: 4,
          [Op.lte]: 6
        }
      }
    });
    await user.addTopics(topics);

    // UsersReadPosts
    // add user 2 to post 2, 3
    user = await db.User.findByPk(2);
    let posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.gte]: 2,
          [Op.lte]: 3
        }
      }
    });
    await user.addReadPosts(posts);

    // add user 3 to post 1, 3, 4
    user = await db.User.findByPk(3);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.in]: [1, 3, 4]
        }
      }
    });
    await user.addReadPosts(posts);

    // add user 4 to post 1, 5, 6
    user = await db.User.findByPk(4);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.in]: [1, 5, 6]
        }
      }
    });
    await user.addReadPosts(posts);

    // UsersLikedPosts
    // add user 2 to post 2, 3
    user = await db.User.findByPk(2);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.gte]: 2,
          [Op.lte]: 3
        }
      }
    });
    await user.addLikedPosts(posts);

    // add user 3 to post 1, 4
    user = await db.User.findByPk(3);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.gte]: [1, 4]
        }
      }
    });
    await user.addLikedPosts(posts);

    // add user 4 to post 4, 5
    user = await db.User.findByPk(4);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.gte]: 4,
          [Op.lte]: 5
        }
      }
    });
    await user.addLikedPosts(posts);

    // UsersFollowers
    // add followers 3, 4, 6 to user 2
    user = await db.User.findByPk(2);
    let followers = await db.User.findAll({
      where: {
        userId: {
          [Op.in]: [3, 4, 6]
        }
      }
    });
    await user.addFollowers(followers);

    // add followers 4, 5 to user 3
    user = await db.User.findByPk(3);
    followers = await db.User.findAll({
      where: {
        userId: {
          [Op.in]: [4, 5]
        }
      }
    });
    await user.addFollowers(followers);

    // add followers 2, 5, 6 to user 4
    user = await db.User.findByPk(4);
    followers = await db.User.findAll({
      where: {
        userId: {
          [Op.in]: [2, 5, 6]
        }
      }
    });
    await user.addFollowers(followers);

    // add followers 2, 6 to user 5
    user = await db.User.findByPk(5);
    followers = await db.User.findAll({
      where: {
        userId: {
          [Op.in]: [2, 6]
        }
      }
    });
    await user.addFollowers(followers);

    // TopicsPosts
    // add topic 1 to post 1, 2, 3
    let topic = await db.Topic.findByPk(1);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.in]: [1, 2, 3]
        }
      }
    });
    await topic.addPosts(posts);

    // add topic 4 to post 4, 5
    topic = await db.Topic.findByPk(4);
    posts = await db.Post.findAll({
      where: {
        postId: {
          [Op.in]: [4, 5]
        }
      }
    });
    await topic.addPosts(posts);

    // add topic 6 to post 6
    topic = await db.Topic.findByPk(6);
    posts = await db.Post.findAll({
      where: {
        postId: 6
      }
    });
    await topic.addPosts(posts);

    // PostResponses
    // add response 2, 3 to post 1
    let post = await db.Post.findByPk(1);
    let responses = await db.Post.findAll({
      where: {
        postId: {
          [Op.in]: [2, 3]
        }
      }
    });
    await post.addResponses(responses);

    // add response 5 to post 4
    post = await db.Post.findByPk(4);
    responses = await db.Post.findAll({
      where: {
        postId: 5
      }
    });
    await post.addResponses(responses);
  } catch (err) {
    console.log(err);
  }
};

createSampleData();
