const {
    projects,
    getProject,
    createProject,
    stopProject,
    resumeProject,
    addUserToProject,
    addprogress,
    popLastProgress
} = require('../service/project.service')

const {
    users,
    getUser,
    activateUser,
    deleteUser,
    createUser,
    updateProfile,
    getInactiveUser
} = require('../service/user.service')

const resolvers = {
    Query: {
        users: async ()=> users(),
        getInactiveUser: async ()=> getInactiveUser(),
        getUser: async (parent, args, context, info) => getUser(args.id),

        projects: async () => projects(),
        getProject: async (parent, args, context, info) => getProject(args.title)
    },

    Mutation:{
        createUser: (parent, args, context, info) => createUser(args.user),
        activateUser: async (parent, args, context, info) => activateUser(args.id),
        deleteUser: async (parent, args, context, info) => deleteUser(args.id),
        updateProfile: async(parent, args, context, info) => updateProfile(args.id, args.newUserData),

        createProject: (parent, args, context, info) => createProject(args.project),
        stopProject: async (parent, args, context, info) => stopProject(args.title),
        resumeProject: async (parent, args, context, info) => resumeProject(args.title),
        addprogress: async (parent, args, context, info) => addprogress(args.id, args.progress),
        popLastProgress: async (parent, args, context, info) => popLastProgress(args.id)
    }
}

module.exports = resolvers;