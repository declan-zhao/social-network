module.exports = (sequelize, Sequelize) => {
  class Topic extends Sequelize.Model {}
  Topic.init({
    // attributes
    topicId: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    topicName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize
  });

  Topic.associate = (models) => {
    // followers
    Topic.belongsToMany(models.User, {
      as: 'Followers',
      through: 'UsersTopics',
      foreignKey: 'topicId'
    });

    // posts
    Topic.belongsToMany(models.Post, {
      as: 'Posts',
      through: 'TopicsPosts',
      foreignKey: 'topicId'
    });

    // subtopics
    Topic.belongsToMany(Topic, {
      as: 'Subtopics',
      through: 'TopicSubtopics',
      foreignKey: 'topicId',
      otherKey: 'subtopicId'
    });
  };

  return Topic;
};
