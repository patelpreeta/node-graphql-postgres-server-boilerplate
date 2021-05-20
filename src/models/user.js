'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING
    },
    domain: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    access_token: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING
    },
    is_admin: {
      type: DataTypes.STRING
    },
    scopes: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    expiry_date: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  })

  return user
}