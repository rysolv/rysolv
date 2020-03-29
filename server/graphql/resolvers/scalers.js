const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  parseValue: value => {
    if (typeof value === 'object') {
      return value;
    }
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return null;
  },
  serialize: value => {
    if (typeof value === 'object') {
      return value;
    }
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return null;
  },
  parseLiteral: ast => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`);
      default:
        return null;
    }
  },
});

module.exports = ObjectScalarType;
