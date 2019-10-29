const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// const characters = [
//   { id: '1', name: 'Anakin Skywalker', email: 'skyguy@gmail.com', age: 39 },
//   { id: '2', name: 'Luke Skywalker', email: 'Marcod@gmail.com', age: 18 },
//   { id: '3', name: 'Leia Organa', email: 'princess@gmail.com', age: 18 }
// ];

const CharacterType = new GraphQLObjectType({
  name: 'Character',
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
    addCharacter: {
      type: CharacterType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios
          .post(`http://localhost:3000/characters`, {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    deleteCharacter: {
      type: CharacterType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/characters/${args.id}`)
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    updateCharacter: {
      type: CharacterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/characters/${args.id}`, {
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
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/characters/${args.id}`)
          .then(res => res.data)
          .catch(err => new Error(err.message));
      }
    },
    characters: {
      type: GraphQLList(CharacterType),
      resolve: () => {
        return axios
          .get('http://localhost:3000/characters')
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
