const Project = require('../models/projectModel');
const User = require('../models/userModel');

const projects = async () => await Project.find({}).populate("members")
const getProject = async (title) => await Project.findOne({title})

const createProject = (project) => {
    const newProject = new Project(project);
    return newProject.save()
        .then(u => "Project: Created")
        .catch(err => "Project: Error")
}
const stopProject = (title) => {
    return Project.updateOne({title}, {$set:{isActive:false}})
        .then(u => "Project: Stopped")
        .catch(err => "Project: Error")
}

const resumeProject = (title) => {
    return Project.updateOne({title}, {$set:{isActive:true}})
        .then(u => "Project: Resumed")
        .catch(err => "Project: Error")
}


const addUserToProject = async(id, titleProject) => {
    const user = await User.findOne({id})
    if (user && user.accountStatus == "Activa"){
        const project = await Project.findOne({title: titleProject})
        if (project && project.isActive){
            if(project.members.find(i => i == user.id)){
                return console.log("El usuario ya se encuentra registrado")
            } else {
                await Project.updateOne({title:titleProject}, {$push:{members: user._id}})
            }
        } else {
            return console.log("Por el momento no se pueden adicionar miembros al proyecto")
        }
    } else {
        console.log("El usuario a registrar en el proyecto es inválido")
    }
}



module.exports = {
    projects,
    getProject,
    createProject,
    stopProject,
    resumeProject,
    addUserToProject
}