const {
    projects,
    getProject,
    createProject,
    stopProject,
    resumeProject,
    addUserToProject
} = requiere('../service/project.service')

const {
    users,
    getUser,
    activateUser,
    deleteUser,
    createUser
} = require('../service/user.service')

const resolvers = {
    Query: {
        users: async ()=> users(),
        getUser: async (parent, args, context, info) => getUser(args.id),

        projects: async () => projects(),
        getProject: async (parent, args, context, info) => getProject(args.title)
    },

    Mutation:{
        createUser: (parent, args, context, info) => createUser(args.user),
        activateUser: async (parent, args, context, info) => activateUser(args.id),
        deleteUser: async (parent, args, context, info) => deleteUser(args.id),

        createProject: (parent, args, context, info) => createProject(args.project),
        stopProject: async (parent, args, context, info) => stopProject(args.title),
        resumeProject: async (parent, args, context, info) => resumeProject(args.title)
    }
}

module.exports = resolvers;