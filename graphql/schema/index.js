const { buildASTSchema } = require('graphql');

module.exports = buildASTSchema(
  `
    type User {
      _id: ID!
      email: String!
      password: String
      createdTask: [Task!]
    }

    type AuthData {
      userId: ID!
      email: String!
      token: String!
      tokenExpiration: Int!
    }

    type Task {
      _id: ID!
      title: String!
      description: String
      date: String!
      category: String
      creator: User!
    }

    input UserInput {
      email: String!
      password: String!
    }

    input TaskInput {
      _id: String
      title: String!
      description: String
      date: String!
      category: String
    }

    type RootQuery {
      getAllTasks: [Task!]!
      login(email: String!, password: String!): AuthData!
      filterTasksBy(filter: String!): [Task!]!
    }

    type RootMutation {
      createUser(userInput: UserInput): User
      createTask(taskInput: TaskInput): Task
      updateTask(updateTaskInput: TaskInput): Task!
      deleteTask(taskId: ID!): Task!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `
);