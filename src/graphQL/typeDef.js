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
        general_objective:String
        specific_objectives:String
        leader:String
        members:[User]
    }

    type Query{
        users:[User]
        getUser(id:Int):User
        projects:[Project]
        getProject(title:String):Project
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
        general_objective:String
        specific_objectives:String
        budget:Int
        leader:String

    }

    type Mutation{
        createUser(user:UserInput):String
        createProject(project:projectInput):String
        activateUser(id:Int):String
        deleteUser(id:Int):String
        stopProject(title:String):String
        resumeProject(title:String):String
        addUserToProject(id:Int, title:String):String
    }
    `

module.exports = typeDefs;