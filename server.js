const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const {UserModel,PostModel} = require('./modules/UserSchema');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const post = await PostModel.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/users/:userId/posts', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by userId
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find posts associated with the user
        const posts = await PostModel.find({ author: userId });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    if (result)
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(`Error: ${err}`));
