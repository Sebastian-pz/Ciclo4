const Project = require('../models/projectModel');
const User = require('../models/userModel');
const {v4: uuidv4} = require('uuid')

const projects = async () => await Project.find({}).populate("members")
const getProject = async (title) => await Project.findOne({title})

const createProject = (project) => {
    const newProject = new Project(project);
    newProject.id=uuidv4()
    return newProject.save()
        .then(u => "Project created")

}
const stopProject = async (title) => {
    const u = await Project.updateOne({ title }, { $set: { isActive: false } });
    return "Project: Stopped";

}

const resumeProject = async (title) => {
    try {
        const u = await Project.updateOne({ title }, { $set: { isActive: true } });
        return "Project: Resumed";
    } catch (err) {
        return "Project: Error";
    }
}

const addprogress = async (id, progress) => {
    try {
        const u = await Project.updateOne({id}, {$push: {progress}})
            .then(r => "Progreso añadido")
    } catch (err) {
        return console.log(err)
    }
}

const popLastProgress = async (id) => {
    try {
        const u = await Project.updateOne({id}, {$pop: {progress:1}})
            .then(r => "Progreso deshecho")
    } catch (err) {
        return console.log(err)
    }
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
    addUserToProject,
    addprogress,
    popLastProgress
}