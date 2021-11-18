const mongoose = require('mongoose');

const URI = 'mongodb+srv://admin:admin@app-udea.liri8.mongodb.net/investigation-project?retryWrites=true&w=majority';
mongoose.connect(URI);


const MongoDB = mongoose.connection;
MongoDB.on('open', _ => {
    console.log("Connected to db")
});