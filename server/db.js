const mongoose = require('mongoose')
require('dotenv').config();

const url = `${process.env.MONGODBCONNECTION}`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set('strictQuery', false);
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


var userSchema = mongoose.Schema({
    name: String,
    password: String,
    rooms: Array
});

var roomSchema = mongoose.Schema({
    name: String,
    messages: Array
});

var User = mongoose.model('User', userSchema);
var Room = mongoose.model('Room', roomSchema);

module.exports.db = {userSchema, roomSchema}