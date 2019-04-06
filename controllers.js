const db = require('./models/index.js');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const exclude = ['createdAt', 'updatedAt'];
const rawResult = {
  attributes: {
    exclude
  },
  raw: true
};
const postAttr = ['postId', 'type', 'content'];

const getUsers = async () => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      return await db.User.findAll(rawResult, {
        transaction: t
      });
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getPosts = async () => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      return await db.Post.findAll(rawResult, {
        transaction: t
      });
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getTopics = async () => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      return await db.Topic.findAll(rawResult, {
        transaction: t
      });
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getGroups = async () => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      return await db.Group.findAll(rawResult, {
        transaction: t
      });
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getFollowingUsers = async (userName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      options = rawResult;
      options.joinTableAttributes = [];

      const followingUsers = await user.getFollowingUsers(options, {
        transaction: t
      });

      return followingUsers.length > 0 ? followingUsers : `User '${userName}' has not followed any user yet!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getFollowingTopics = async (userName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      options = rawResult;
      options.joinTableAttributes = [];

      const topics = await user.getTopics(options, {
        transaction: t
      });

      return topics.length > 0 ? topics : `User '${userName}' has not followed any topic yet!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getJoinedGroups = async (userName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      options = rawResult;
      options.joinTableAttributes = [];

      const groups = await user.getGroups(options, {
        transaction: t
      });

      return groups.length > 0 ? groups : `User '${userName}' has not joined any group yet!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const postContent = async (userName, topicName, content) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          topicName
        }
      };
      const topic = await db.Topic.findOne(options, {
        transaction: t
      });

      if (!topic) {
        return `Topic '${topicName}' does not exist!`;
      }

      const post = await db.Post.create({
        userId: user.get('userId'),
        content,
        type: 'text'
      }, {
        transaction: t
      });

      if (!post) {
        throw new Error('Rollback initiated: Failed to create post!');
      }

      const association = await post.addTopic(topic, {
        transaction: t
      });

      if (!association) {
        throw new Error('Rollback initiated: TopicsPosts association error!');
      }

      return `Post #${post.get('postId')} has been successfully created!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const joinGroup = async (userName, groupName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          groupName
        }
      };
      const group = await db.Group.findOne(options, {
        transaction: t
      });

      if (!group) {
        return `Group '${groupName}' does not exist!`;
      }

      const association = await user.addGroup(group, {
        transaction: t
      });

      if (!association) {
        throw new Error(`Rollback initiated: User '${userName}' has already joined group '${groupName}'!`);
      }

      return `User '${userName}' has successfully joined group '${groupName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const leaveGroup = async (userName, groupName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          groupName
        }
      };
      const group = await db.Group.findOne(options, {
        transaction: t
      });

      if (!group) {
        return `Group '${groupName}' does not exist!`;
      }

      const userHasGroup = await user.hasGroup(group, {
        transaction: t
      });

      if (!userHasGroup) {
        return `User '${userName}' has not joined group '${groupName}' yet!`;
      }

      const userLeaveGroupAssociation = await user.removeGroup(group, {
        transaction: t
      });

      if (!userLeaveGroupAssociation) {
        throw new Error(`Rollback initiated: User '${userName}' failed to leave group '${groupName}'!`);
      }

      return `User '${userName}' has successfully left group '${groupName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const followUser = async (userName, followingUserName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      if (userName == followingUserName) {
        return 'Invalid: User cannot follow themselves!';
      }

      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          userName: followingUserName
        }
      };
      const followingUser = await db.User.findOne(options, {
        transaction: t
      });

      if (!followingUser) {
        return `Following user '${followingUserName}' does not exist!`;
      }

      const association = await followingUser.addFollower(user, {
        transaction: t
      });

      if (!association) {
        throw new Error(`Rollback initiated: User '${userName}' has already followed user '${followingUserName}'!`);
      }

      return `User '${userName}' has successfully followed user '${followingUserName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const unfollowUser = async (userName, followingUserName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      if (userName == followingUserName) {
        return 'Invalid: User cannot unfollow themselves!';
      }

      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          userName: followingUserName
        }
      };
      const followingUser = await db.User.findOne(options, {
        transaction: t
      });

      if (!followingUser) {
        return `Following user '${followingUserName}' does not exist!`;
      }

      const userHasFollowingUser = await user.hasFollowingUser(followingUser, {
        transaction: t
      });

      if (!userHasFollowingUser) {
        return `User '${userName}' has not followed user '${followingUserName}' yet!`;
      }

      const userUnfollowUserAssociation = await user.removeFollowingUser(followingUser, {
        transaction: t
      });

      if (!userUnfollowUserAssociation) {
        throw new Error(`Rollback initiated: User '${userName}' failed to unfollow user '${followingUserName}'!`);
      }

      return `User '${userName}' has successfully unfollowed user '${followingUserName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const followTopic = async (userName, topicName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          topicName
        }
      };
      const topic = await db.Topic.findOne(options, {
        transaction: t
      });

      if (!topic) {
        return `Topic '${topicName}' does not exist!`;
      }

      const association = await user.addTopic(topic, {
        transaction: t
      });

      if (!association) {
        throw new Error(`Rollback initiated: User '${userName}' has already followed topic '${topicName}'!`);
      }

      return `User '${userName}' has successfully followed topic '${topicName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const unfollowTopic = async (userName, topicName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          topicName
        }
      };
      const topic = await db.Topic.findOne(options, {
        transaction: t
      });

      if (!topic) {
        return `Topic '${topicName}' does not exist!`;
      }

      const userHasTopic = await user.hasTopic(topic, {
        transaction: t
      });

      if (!userHasTopic) {
        return `User '${userName}' has not followed topic '${topicName}' yet!`;
      }

      const userUnfollowTopicAssociation = await user.removeTopic(topic, {
        transaction: t
      });

      if (!userUnfollowTopicAssociation) {
        throw new Error(`Rollback initiated: User '${userName}' failed to unfollow topic '${topicName}'!`);
      }

      return `User '${userName}' has successfully unfollowed topic '${topicName}'!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getNewPostsFromFollowingTopic = async (userName, topicName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          topicName
        }
      };
      const topic = await db.Topic.findOne(options, {
        transaction: t
      });

      if (!topic) {
        return `Topic '${topicName}' does not exist!`;
      }

      const userTopicAssociation = await user.hasTopic(topic, {
        transaction: t
      });

      if (!userTopicAssociation) {
        return `User '${userName}' has not followed topic '${topicName}' yet!`;
      }

      options = rawResult;
      options.joinTableAttributes = [];

      const readPosts = await user.getReadPosts(options, {
        transaction: t
      });

      options = {
        include: [{
          model: db.User,
          as: 'Likers',
          attributes: []
        }, {
          model: db.User,
          as: 'Author',
          attributes: []
        }, {
          model: db.Post,
          as: 'ParentPost',
          attributes: []
        }],
        attributes: [
          [db.sequelize.col('Author.userName'), 'author'],
          [db.sequelize.col('ParentPost.postId'), 'parentPostId'], ...postAttr,
          [db.sequelize.fn('COUNT', db.sequelize.col('Likers.userId')), 'likes']
        ],
        where: {
          userId: {
            [Op.ne]: user.get('userId')
          },
          postId: {
            [Op.notIn]: readPosts.map(obj => obj.postId)
          }
        },
        joinTableAttributes: [],
        group: postAttr
      };

      const unreadPosts = await topic.getPosts(options, {
        transaction: t
      });
      let rawUnreadPosts = await topic.getPosts({
        ...options,
        raw: true
      }, {
        transaction: t
      });
      let resUnreadPosts = [];

      for (let i = 0; i < unreadPosts.length; i++) {
        const resUnreadPost = _.pick(rawUnreadPosts[i], ['author', 'parentPostId', ...postAttr, 'likes']);
        resUnreadPosts.push(resUnreadPost);

        // mark as read
        const userPostAssociation = await unreadPosts[i].addReader(user, {
          transaction: t
        });

        if (!userPostAssociation) {
          throw new Error(`Rollback initiated: User '${userName}' cannot read post #${unreadPosts[i].get('postId')}!`);
        }
      }

      return resUnreadPosts.length > 0 ? resUnreadPosts : `No new posts on topic '${topicName}' since last time.`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const getNewPostsFromFollowingUser = async (userName, followingUserName) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      if (userName == followingUserName) {
        return 'Invalid: User cannot get unread posts from themselves!';
      }

      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          userName: followingUserName
        }
      };
      const followingUser = await db.User.findOne(options, {
        transaction: t
      });

      if (!followingUser) {
        return `Following user '${followingUserName}' does not exist!`;
      }

      const userFollowingUserAssociation = await followingUser.hasFollower(user, {
        transaction: t
      });

      if (!userFollowingUserAssociation) {
        return `User '${userName}' has not followed user '${followingUserName}' yet!`;
      }

      options = rawResult;
      options.joinTableAttributes = [];

      const readPosts = await user.getReadPosts(options, {
        transaction: t
      });

      options = {
        include: [{
          model: db.User,
          as: 'Likers',
          attributes: []
        }, {
          model: db.Topic,
          as: 'Topics',
          attributes: []
        }, {
          model: db.Post,
          as: 'ParentPost',
          attributes: []
        }],
        attributes: [
          [db.sequelize.col('Topics.topicName'), 'topicName'],
          [db.sequelize.col('ParentPost.postId'), 'parentPostId'], ...postAttr,
          [db.sequelize.fn('COUNT', db.sequelize.col('Likers.userId')), 'likes']
        ],
        where: {
          userId: {
            [Op.ne]: user.get('userId')
          },
          postId: {
            [Op.notIn]: readPosts.map(obj => obj.postId)
          }
        },
        joinTableAttributes: [],
        group: postAttr
      };

      const unreadPosts = await followingUser.getPosts(options, {
        transaction: t
      });
      let rawUnreadPosts = await followingUser.getPosts({
        ...options,
        raw: true
      }, {
        transaction: t
      });
      let resUnreadPosts = [];

      for (let i = 0; i < unreadPosts.length; i++) {
        const resUnreadPost = _.pick(rawUnreadPosts[i], ['topicName', 'parentPostId', ...postAttr, 'likes']);
        resUnreadPosts.push(resUnreadPost);

        // mark as read
        const userPostAssociation = await unreadPosts[i].addReader(user, {
          transaction: t
        });

        if (!userPostAssociation) {
          throw new Error(`Rollback initiated: User '${userName}' cannot read post #${unreadPosts[i].get('postId')}!`);
        }
      }

      return resUnreadPosts.length > 0 ? resUnreadPosts : `No new posts from user '${followingUserName}' since last time.`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const respondPost = async (userName, postId, content) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          postId
        }
      };
      const post = await db.Post.findOne(options, {
        transaction: t
      });

      if (!post) {
        return `Post #${postId} does not exist!`;
      }

      const userHasPost = await user.hasPost(post, {
        transaction: t
      });

      if (!userHasPost) {
        const userHasReadPostAssociation = await user.hasReadPost(post, {
          transaction: t
        });

        if (!userHasReadPostAssociation) {
          return `User '${userName}' has not read post #${postId} yet!`;
        }
      }

      const response = await db.Post.create({
        userId: user.get('userId'),
        content,
        type: 'text'
      }, {
        transaction: t
      });

      if (!response) {
        throw new Error('Rollback initiated: Failed to create response!');
      }

      const topic = await post.getTopics({
        transaction: t
      });
      const topicsPostsAssociation = await response.addTopic(topic, {
        transaction: t
      });

      if (!topicsPostsAssociation) {
        throw new Error('Rollback initiated: TopicsPosts association error!');
      }

      const postResponsesAssociation = await post.addResponses(response, {
        transaction: t
      });

      if (!postResponsesAssociation) {
        throw new Error('Rollback initiated: PostResponses association error!');
      }

      return `Response #${response.get('postId')} has been successfully created!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const readPost = async (userName, postId) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          postId
        }
      };
      const post = await db.Post.findOne(options, {
        transaction: t
      });

      if (!post) {
        return `Post #${postId} does not exist!`;
      }

      const userHasPost = await user.hasPost(post, {
        transaction: t
      });

      if (!userHasPost) {
        const userHasReadPostAssociation = await user.hasReadPost(post, {
          transaction: t
        });

        if (!userHasReadPostAssociation) {
          const userAddReadPostAssociation = await user.addReadPost(post, {
            transaction: t
          });

          if (!userAddReadPostAssociation) {
            throw new Error(`Rollback initiated: User '${userName}' failed to read post #${postId}!`);
          }
        }
      }

      options = {
        include: [{
          model: db.User,
          as: 'Likers',
          attributes: []
        }, {
          model: db.User,
          as: 'Author',
          attributes: []
        }, {
          model: db.Topic,
          as: 'Topics',
          attributes: []
        }, {
          model: db.Post,
          as: 'ParentPost',
          attributes: []
        }],
        attributes: [
          [db.sequelize.col('Author.userName'), 'author'],
          [db.sequelize.col('Topics.topicName'), 'topicName'],
          [db.sequelize.col('ParentPost.postId'), 'parentPostId'], ...postAttr,
          [db.sequelize.fn('COUNT', db.sequelize.col('Likers.userId')), 'likes']
        ],
        where: {
          postId
        },
        joinTableAttributes: [],
        group: postAttr
      };
      let rawPost = await db.Post.findOne({
        ...options,
        raw: true
      }, {
        transaction: t
      });
      const resPost = _.pick(rawPost, ['author', 'topicName', 'parentPostId', ...postAttr, 'likes']);

      return resPost;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const likePost = async (userName, postId) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          postId
        }
      };
      const post = await db.Post.findOne(options, {
        transaction: t
      });

      if (!post) {
        return `Post #${postId} does not exist!`;
      }

      const userHasPost = await user.hasPost(post, {
        transaction: t
      });

      if (!userHasPost) {
        const userHasReadPostAssociation = await user.hasReadPost(post, {
          transaction: t
        });

        if (!userHasReadPostAssociation) {
          return `User '${userName}' has not read post #${postId} yet!`;
        }
      }

      const userLikedPostAssociation = await user.addLikedPost(post, {
        transaction: t
      });

      if (!userLikedPostAssociation) {
        throw new Error(`Rollback initiated: User '${userName}' has already liked post #${postId}!`);
      }

      return `User '${userName}' has successfully liked post #${postId}!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const unlikePost = async (userName, postId) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      let options = {
        where: {
          userName
        }
      };
      const user = await db.User.findOne(options, {
        transaction: t
      });

      if (!user) {
        return `User '${userName}' does not exist!`;
      }

      options = {
        where: {
          postId
        }
      };
      const post = await db.Post.findOne(options, {
        transaction: t
      });

      if (!post) {
        return `Post #${postId} does not exist!`;
      }

      const userLikedPost = await user.hasLikedPost(post, {
        transaction: t
      });

      if (!userLikedPost) {
        return `User '${userName}' has not liked post #${postId} yet!`;
      }

      const userUnlikePostAssociation = await user.removeLikedPost(post, {
        transaction: t
      });

      if (!userUnlikePostAssociation) {
        throw new Error(`Rollback initiated: User '${userName}' failed to unlike post #${postId}!`);
      }

      return `User '${userName}' has successfully unliked post #${postId}!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

const createUser = async (userInfo) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const user = await db.User.create(userInfo, {
        transaction: t
      });

      if (!user) {
        throw new Error('Rollback initiated: Failed to create user!');
      }

      return `User '${user.get('userName')}' has been successfully created!`;
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getUsers,
  getPosts,
  getTopics,
  getGroups,
  getFollowingUsers,
  getFollowingTopics,
  getJoinedGroups,
  postContent,
  joinGroup,
  leaveGroup,
  followUser,
  unfollowUser,
  followTopic,
  unfollowTopic,
  getNewPostsFromFollowingTopic,
  getNewPostsFromFollowingUser,
  respondPost,
  readPost,
  likePost,
  unlikePost,
  createUser
};
