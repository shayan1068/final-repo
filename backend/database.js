const mongoose = require('mongoose');

const connectDatabase = () => {
    const uri = "mongodb+srv://shayan:shayan1%402.@madadgar.a04xu.mongodb.net/Madadgar";

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((data) => {
        console.log(`MongoDB is connected with the server: ${data.connection.host}`);
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });
};

module.exports = connectDatabase;
