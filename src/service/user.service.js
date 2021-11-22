const User = require('../models/userModel');

const users = async ()=> await User.find({});
const getUser = async (id) => await User.findOne({id});
const activateUser = (id) => User.updateOne({id},{accountStatus:"Activa"});
const deleteUser = () => User.deleteOne({id});


const createUser = (user) => {
    const {password} = user;
    const newUser = new User(user);
    const encryptedPassword = aes256.encrypt(key, password);
    newUser.password = encryptedPassword;
    return newUser.save()
        .then (u => "user created")
        .catch(err => "Failed")
}

module.exports = {
    users,
    getUser,
    activateUser,
    deleteUser,
    createUser
}