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
        budget:Int
        id:String
        description:String
        general_objective:String
        specific_objectives:String
        progress:[projectProgress]
        leader:String
        members:[String]
        pending_approval:[String]
        isActive:Boolean
        _id:String
    }
    type projectProgress{
        progress:String
        author:String
        comment:String
    }

    type Query{
        users:[User]
        getUser(id:String):User
        projects:[Project]
        getProject(id:String):Project
        getActiveProjects:[Project]
        getInactiveProjects:[Project]
        getInactiveUser:[User]
        myProjects(leader:String):[Project]
        getName(id:String):String
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

    type Auth {
        jwt:String
        status:Int
    }

    input progressInput {
        progress:String
        author:String
        comment:String
    }

    input userUpdateInput{
        name:String
        email:String
        password:String
    }

    input projectUpdateInput{
        title:String
        general_objective:String
        specific_objectives:String
        description:String
    }

    type Mutation{
        createUser(user:UserInput):String
        authenticate(email:String, password:String):Auth
        activateUser(id:String):String
        updateProfile(id:String, newUserData:userUpdateInput):String
        deleteUser(id:String):String

        updateProject(id:String, newProjectData:projectUpdateInput):String
        createProject(project:projectInput):String
        stopProject(id:String):String
        resumeProject(title:String):String
        addUserToProject(id:String, title:String):String
        addprogress(id:String, newProgress:progressInput):String
        pullProgress(id:String, progress:String):String
        activateProject(id:String):String
        registerToProject(id:String, user:String):String
        acceptUser(id:String, user:String):String
        declineUser(id:String, user:String):String

    }
    `

module.exports = typeDefs;