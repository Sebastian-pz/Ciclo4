const {isAdmin, isLeader} = require('../middleware/authjwt')

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
    registerToProject,
    declineUser,
    acceptUser
} = require('../service/project.service')

const {
    users,
    getUser,
    Auth,
    activateUser,
    deleteUser,
    createUser,
    updateProfile,
    getInactiveUser,
    getName
} = require('../service/user.service')

const resolvers = {
    Query: {
        users: async ()=> users(),
        getInactiveUser: async ()=> getInactiveUser(),
        getUser: async (parent, args, context, info) => getUser(args.id),
        getName:async(parent, args, context, info)=> getName(args.id),

        projects: async () => projects(),
        getProject: async (parent, args, context, info) => getProject(args.id),
        getInactiveProjects: async () => getInactiveProjects(),
        getActiveProjects: async () => getActiveProjects(),
        myProjects: async(parent, args, context, info) => myProjects(args.leader)
    },

    Mutation:{
        createUser: (parent, args, context, info) => createUser(args.user),
        activateUser: async (parent, args, context, info) => {
            if(isLeader(context.role) || isAdmin(context.role)){
                activateUser(args.id)
                .then(console.log("Se activo un usuario"))
                .catch(error => "Error en la activación de usuario")
            }
        },
        deleteUser: async (parent, args, context, info) => {
            if(isLeader(context.role) || isAdmin(context.role)){
                deleteUser(args.id)
            }
        },
        updateProfile: async(parent, args, context, info) => updateProfile(args.id, args.newUserData),
        authenticate: async(parent, args, context, info)=> Auth(args.email, args.password),

        createProject: (parent, args, context, info) => {
            if(isLeader(context.role) || isAdmin(context.role)){
                createProject(args.project)
            }
        },

        stopProject: async (parent, args, context, info) => {
            if(isAdmin(context.role)){
                stopProject(args.id)
            }
        },

        resumeProject: async (parent, args, context, info) => {
            if(isAdmin(context.role)){
                resumeProject(args.title)
            }
        },
        addprogress: async (parent, args, context, info) => {
            if(isLeader(context.role)){
                addprogress(args.id, args.progress)
            }
        },
        popLastProgress: async (parent, args, context, info) => popLastProgress(args.id),
        updateProject: async (parent, args, context, info) => {
            if(isLeader(context.role)){
                updateProject(args.id, args.newProjectData)
            }
        },
        activateProject: async(parent, args, context, info) => {
            if(isAdmin(context.role)){
                activateProject(args.id)
            }
        },
        registerToProject: async(parent, args, context, info) => registerToProject(args.id, args.user),
        acceptUser: async(parent, args, context, info) => acceptUser(args.id, args.user),
        declineUser: async(parent, args, context, info) => declineUser(args.id, args.user)
    }
}

module.exports = resolvers;