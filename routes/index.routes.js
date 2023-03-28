const router = require('express').Router()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const Post = require('../models/Post.model')
const User = require('../models/User.model')
const Message = require('../models/Message.model')
const Conversation = require('../models/Conversation.model')
const fileUploader = require('../config/cloudinary.config')

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.get('/posts', (req, res, next) => {
  Post.find()
    .then((postsFromDB) => {
      res.json(postsFromDB)
    })
    .catch((err) => next(err))
})

// router.get("/:id", (req, res , next) => {
//   Post.find()
//   .then(postFromDB => res.json(postFromDB))
//   .catch(err => next(err))
// });

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'))
    return
  }
  res.json({ secure_url: req.file.path })
})

router.post('/posts', (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  Post.create(req.body)
    .then((createdPost) => {
      console.log('Created new post: ', createdPost)
      res.status(200).json(createdPost)
    })
    .catch((err) => next(err))
})

router.put('/:id/addlike', (req, res, next) => {
  const [...likes] = req.body
  console.log(likes)
  Post.findByIdAndUpdate(req.params.id, {
    likes,
  })
    .then(() => {
      res.status(200).json("updated")
    })
    .catch((err) => next(err))
})

router.delete('/posts/:id', (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('bla')
      res.status(200).json({ message: 'post deleted' })
    })
    .catch((err) => next(err))
})

//create a conv

router.post("/conversations",(req, res)=>{
  Conversation.findOne({members: req.body})
  .then((result)=>{
    if(!result){ 
    Conversation.create({members: req.body})
    .then(createdConv => {
      console.log( createdConv)
      res.status(200)
    })
  } else {
    res.status(404).json("You already have a conv with this person")
  }})
  .catch(err => console.log(err))
})


//get conv of a user

router.get('/conversations/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err)
  }
})

//add

router.post('/messages', async (req, res) => {
  const newMessage = new Message(req.body)

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get

router.get('/messages/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get a user
router.get("/users", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = await User.findById(userId)
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router
