require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const helmet = require("helmet")
const { createErrorResponse } = require('./utils/response')
const app = express()
const { OAuth2Client } = require('google-auth-library')
const { google } = require('googleapis')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const { resolvers, typeDefs } = require('./modules')
// const directives = require('./directives')
const { makeExecutableSchema } = require('graphql-tools')
const createGraphQLLogger = require('graphql-log')
const db = require('./models')
const http = require('http')

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// require('./routes')(app); 

app.use((err, req, res, next) => {
	createErrorResponse(err, res)
})

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.get('/oauth2callback', async (req, res) => {
	const oAuth2Client = new google.auth.OAuth2(
		"406787645084-tlpp85em418r1pbe35lmfh2tdrnudqi7.apps.googleusercontent.com",
		"Wo6MuTJhUamIOMO-1FBOawVT",
		[
			"http://localhost:3000/oauth2callback"
		]
	)


	// const queryparams = url.split('?')[1];
	const code = req.query.code
	const { tokens } = await oAuth2Client.getToken(code)
	res.send('Hello World!')
})

const server = new ApolloServer({
	schema,
	introspection: true,
	playground: true,
	formatError: error => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message
			.replace('SequelizeValidationError: ', '')
			.replace('Validation error: ', '')

		return {
			...error,
			message,
		}
	},
	context: async (ctx) => ({
		req: ctx.req
	})
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)

db.sequelize.sync().then(async () => {
	httpServer.listen(process.env.PORT, () => {
		console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`)
	})
})
