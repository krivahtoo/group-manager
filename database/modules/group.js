'use strict'

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
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
    photo: {
      type: DataTypes.JSON
    },
    maxWords: {
      type: DataTypes.INTEGER
    },
    minSubs: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'group',
    underscored: true,
    timestamps: true
  })

  return Group
}
