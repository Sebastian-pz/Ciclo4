const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type User{
        name:String
        id: Int
        email:String
        accountStatus: String
        role:String
    }

    type Project{
        title:String
        description:String
        leader:String
        members:[Users]
    }

    type Query{
        users:[User]
        user(id:Int):User
        projects:[Project]
    }

    input UserInput{
        name:String
        id:Int
        email:String
        password:String
        role:String
    }

    input projectInput{
        title:String
        description:String
        leader:String
        members: [String]
    }

    type Mutation{
        createUser(user:UserInput):String
        createProject(project:projectInput):String
        activateUser(id:Int):String
        deleteUser(id:Int):String
        stopProject(title:String):String
        resumeProject(title:String):String

    }
    `

module.exports = typeDefs;