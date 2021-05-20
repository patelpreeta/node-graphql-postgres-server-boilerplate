const tokenController = require('../controllers').token
const getServiceAccountToken = require('../controllers').generateToken

module.exports = (app) => {
    app.get('/token', tokenController.createToken)
    app.get('/generate/token', getServiceAccountToken.getTokenServicEAccount)
}