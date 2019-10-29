const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  // GraphQLNonNull,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const characters = [
  { id: '1', name: 'Anakin Skywalker', email: 'skyguy@gmail.com', age: 39 },
  { id: '2', name: 'Luke Skywalker', email: 'Marcod@gmail.com', age: 18 },
  { id: '3', name: 'Leia Organa', email: 'princess@gmail.com', age: 18 }
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    character: {
      type: CharacterType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < characters.length; i++) {
          if (characters[i].id === args.id) return characters[i];
        }
      }
    },
    characters: {
      type: GraphQLList(CharacterType),
      resolve() {
        return characters;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
