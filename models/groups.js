module.exports = (sequelize, Sequelize) => {
  class Group extends Sequelize.Model {}
  Group.init({
    // attributes
    groupId: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    groupName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize
  });

  Group.associate = (models) => {
    // group owner
    Group.belongsTo(models.User, {
      as: 'Owner',
      foreignKey: 'createdBy',
      targetKey: 'userId'
    });

    // group members
    Group.belongsToMany(models.User, {
      as: 'Members',
      through: 'GroupsUsers',
      foreignKey: 'groupId'
    });
  };

  return Group;
};
