const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type User{
        name:String
        id: String
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
        getUser(id:String):User
        projects:[Project]
        getProject(title:String):Project
        getInactiveUser:[User]
    }

    input UserInput{
        name:String
        id:String
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

    input userUpdateInput{
        name:String
        email:String
        password:String
    }

    type Mutation{
        createUser(user:UserInput):String
        createProject(project:projectInput):String
        activateUser(id:String):String
        updateProfile(id:String, newUserData:userUpdateInput):String
        deleteUser(id:String):String
        stopProject(title:String):String
        resumeProject(title:String):String
        addUserToProject(id:String, title:String):String
        addprogress(id:String, progress:String):String
        popLastProgress(id:String):String
    }
    `

module.exports = typeDefs;