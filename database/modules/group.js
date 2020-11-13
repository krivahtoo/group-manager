'use strict'

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    inviteLink: {
      type: DataTypes.STRING
    },
    photo: {
      type: DataTypes.JSON
    },
    admins: {
      type: DataTypes.JSON
    },
    status: {
      type: DataTypes.STRING
    },
    settings: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'group',
    underscored: true,
    timestamps: true
  })

  return Group
}
