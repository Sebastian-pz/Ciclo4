const {
    projects,
    getProject,
    createProject,
    stopProject,
    resumeProject,
    addUserToProject,
    addprogress,
    popLastProgress,
    updateProject,
    getInactiveProjects,
    getActiveProjects,
    activateProject,
    myProjects,
    registerToProject
} = require('../service/project.service')

const {
    users,
    getUser,
    Auth,
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
        getProject: async (parent, args, context, info) => getProject(args.id),
        getInactiveProjects: async () => getInactiveProjects(),
        getActiveProjects: async () => getActiveProjects(),
        myProjects: async(parent, args, context, info) => myProjects(args.leader)
    },

    Mutation:{
        createUser: (parent, args, context, info) => createUser(args.user),
        activateUser: async (parent, args, context, info) => activateUser(args.id),
        deleteUser: async (parent, args, context, info) => deleteUser(args.id),
        updateProfile: async(parent, args, context, info) => updateProfile(args.id, args.newUserData),
        authenticate: async(parent, args, context, info)=> Auth(args.email, args.password),

        createProject: (parent, args, context, info) => createProject(args.project),
        stopProject: async (parent, args, context, info) => stopProject(args.id),
        resumeProject: async (parent, args, context, info) => resumeProject(args.title),
        addprogress: async (parent, args, context, info) => addprogress(args.id, args.progress),
        popLastProgress: async (parent, args, context, info) => popLastProgress(args.id),
        updateProject: async (parent, args, context, info) => updateProject(args.id, args.newProjectData),
        activateProject: async(parent, args, context, info) => activateProject(args.id),
        registerToProject: async(parent, args, context, infor) => registerToProject(args.id, args.user)
    }
}

module.exports = resolvers;