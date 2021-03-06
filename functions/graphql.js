const { ApolloServer, gql } = require("apollo-server-lambda")
const getChickens = require("./utils/getChickens")

const typeDefs = gql`
  type Chicken {
    id: String!
    name: String!
  }
  enum WeekDays {
    TODAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
  }
  type Query {
    chickens(day: WeekDays): [Chicken!]
  }
`

function whichDay(day) {
  switch (day) {
    case "MONDAY":
      return 1
    case "TUESDAY":
      return 2
    case "WEDNESDAY":
      return 3
    case "THURSDAY":
      return 4
    case "FRIDAY":
      return 5
    default:
      return undefined
  }
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    chickens: (parent, args) => {
      const { day } = args
      const dayIndex = whichDay(day)
      return getChickens(dayIndex)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    allowedHeaders: "*"
  }
})
