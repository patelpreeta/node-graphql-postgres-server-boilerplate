const { ApolloError } = require('apollo-server-express')


const generateToken = async (_, args, { models }) => {
  try {
    return {}
  } catch (error) {
    throw error
  }
}
module.exports = {
  generateToken
}
