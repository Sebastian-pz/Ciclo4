const User = require('../models/userModel');
const aes256 = require('aes256');

const encryptKey = 'Clave_para_aes256';

const users = async ()=> await User.find({});
const getUser = async (id) => await User.findOne({id});
const activateUser = (id) => User.updateOne({id},{accountStatus:"Activa"});
const deleteUser = (id) => User.deleteOne({id});


const createUser = (user) => {
    const {password} = user;
    const newUser = new User(user);
    const encryptedPassword = aes256.encrypt(encryptKey, password);
    newUser.password = encryptedPassword;
    return newUser.save()
        .then (u => "user created")
        .catch(err => "Failed")
}

const updateProfile = async (id, newUserData) => {
    const passwordUn = newUserData.password;
    const encryptedPassword = aes256.encrypt(encryptKey, passwordUn)
    return(
    User.updateOne({id}, {email: newUserData.email, password:encryptedPassword, name:newUserData.name})
        .then(u => "User updated")
        .catch(err => "Error")
    )
}

module.exports = {
    users,
    getUser,
    activateUser,
    deleteUser,
    createUser,
    encryptKey,
    updateProfile
}