const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/note";

const connectToMongo = async () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err));
};

module.exports = { connectToMongo };
