const { generateToken } = require('./generate-token')
const resolvers = {
  Query: {
    test() {
      return "Hello"
    }
  },
  Mutation: {
    generateToken
  }
}

module.exports = {
  resolvers
}
