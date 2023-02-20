const mongoose = require('mongoose');
module.exports = () => {
    return mongoose.connect('mongodb+srv://Dkravi:IMravi12@cluster0.jhuqx6x.mongodb.net/newPlayGround');
}