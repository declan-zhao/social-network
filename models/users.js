module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    // attributes
    userId: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATE
    }
  }, {
    sequelize
  });

  User.associate = (models) => {
    // joined groups
    User.belongsToMany(models.Group, {
      as: 'Groups',
      through: 'GroupsUsers',
      foreignKey: 'userId'
    });

    // following topics
    User.belongsToMany(models.Topic, {
      as: 'Topics',
      through: 'UsersTopics',
      foreignKey: 'userId'
    });

    // read posts
    User.belongsToMany(models.Post, {
      as: 'ReadPosts',
      through: 'UsersReadPosts',
      foreignKey: 'userId'
    });

    // liked posts
    User.belongsToMany(models.Post, {
      as: 'LikedPosts',
      through: 'UsersLikedPosts',
      foreignKey: 'userId'
    });

    // followers
    User.belongsToMany(User, {
      as: 'Followers',
      through: 'UsersFollowers',
      foreignKey: 'userId',
      otherKey: 'followerUserId'
    });
  };

  return User;
};
