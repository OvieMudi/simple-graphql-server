const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// const customers = [
//   { id: '1', name: 'Anakin Skywalker', email: 'skyguy@gmail.com', age: 39 },
//   { id: '2', name: 'Luke Skywalker', email: 'Marcod@gmail.com', age: 18 },
//   { id: '3', name: 'Leia Organa', email: 'princess@gmail.com', age: 18 }
// ];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios
          .post(`http://localhost:3000/customers`, {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/customers/${args.id}`, {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve: () => {
        return axios
          .get('http://localhost:3000/customers')
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
