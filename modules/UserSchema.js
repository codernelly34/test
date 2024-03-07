const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }
});

const UserModel = mongoose.model("User", UserSchema);
const PostModel = mongoose.model("Post", PostSchema);

module.exports = {PostModel,UserModel};