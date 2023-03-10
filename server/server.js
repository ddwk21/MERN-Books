const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {resolvers,typeDefs} = require('./schemas')

const {ApolloServer} = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const app = express();
const PORT = process.env.PORT || 3001;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

const apolloStart = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
  console.log(`Apollo playground at http://localhost:${PORT}/gql`)
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  apolloStart(typeDefs,resolvers);

});


