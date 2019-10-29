const app = require('express')();
const graphQL = require('express-graphql');
const schema = require('./schemaX');

const PORT = process.env.PORT || 4100;

app.use(
  '/graphql',
  graphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
