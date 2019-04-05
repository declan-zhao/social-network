module.exports = (sequelize, Sequelize) => {
  class Post extends Sequelize.Model {}
  Post.init({
    // attributes
    postId: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM,
      values: ['text', 'image', 'link'],
      defaultValue: 'text'
    }
  }, {
    sequelize
  });

  Post.associate = (models) => {
    // author
    Post.belongsTo(models.User, {
      as: 'Author',
      foreignKey: 'userId',
      targetKey: 'userId'
    });

    // readers
    Post.belongsToMany(models.User, {
      as: 'Readers',
      through: 'UsersReadPosts',
      foreignKey: 'postId'
    });

    // likers
    Post.belongsToMany(models.User, {
      as: 'Likers',
      through: 'UsersLikedPosts',
      foreignKey: 'postId'
    });

    // topics
    Post.belongsToMany(models.Topic, {
      as: 'Topics',
      through: 'TopicsPosts',
      foreignKey: 'postId'
    });

    // responses
    Post.belongsToMany(Post, {
      as: 'Responses',
      through: 'PostResponses',
      foreignKey: 'postId',
      otherKey: 'responsePostId'
    });
  };

  return Post;
};
