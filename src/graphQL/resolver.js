const Project = require('../models/projectModel');
const User = require('../models/userModel');
const aes256 = require('aes256');

const key = 'Clave_para_aes256';

const resolvers = {
    Query: {
        users: async ()=> await User.find({}),
        projects: async () => await Project.find({})
    },

    Mutation:{
        createUser: (parent, args, context, info) => {
            const {password} = args.user;
            const newUser = new User(args.user);
            const encryptedPassword = aes256.encrypt(key, password);
            newUser.password = encryptedPassword;
            return newUser.save()
                .then (u => "user created")
                .catch(err => "Failed")
        },

        activateUser: async (parent, args, context, info) => {
            return User.updateOne({id:args.id}, {accountStatus:"Activa"})
                .then(u => "Update: Successful")
                .catch(err => "Update: Failed")
        },

        deleteUser: async (parent, args, context, info) => {
            return User.deleteOne({id:args.id})
            .then(u => "User eliminated")
            .catch(err => "Failed")
        },

        createProject: (parent, args, context, info) => {
            const newProject = new Project(args.project);
            return newProject.save()
                .then(u => "Project: Created")
                .catch(err => "Project: Error")
        },

        stopProject: async (parent, args, context, info) => {
            return Project.updateOne({title:args.title}, {$set:{isActive:false}})
                .then(u => "Project: Stopped")
                .catch(err => "Project: Error")
        },
        resumeProject: async (parent, args, context, info) => {
            return Project.updateOne({title:args.title}, {$set:{isActive:true}})
                .then(u => "Project: Resumed")
                .catch(err => "Project: Error")
        }
    }
}

module.exports = resolvers;