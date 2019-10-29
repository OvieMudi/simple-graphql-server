const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  // GraphQLNonNull,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const customers = [
  { id: '1', name: 'Anakin Skywalker', email: 'skyguy@gmail.com', age: 39 },
  { id: '2', name: 'Luke Skywalker', email: 'Marcod@gmail.com', age: 18 },
  { id: '3', name: 'Leia Organa', email: 'princess@gmail.com', age: 18 }
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) return customers[i];
        }
      }
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve() {
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
