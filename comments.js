// create web server
// create comments api
// get comments
// post comments
// put comments
// delete comments

// import express module
const express = require('express');
// create express app
const app = express();
// import data
const comments = require('./data/comments');
// import uuid
const { v4: uuidv4 } = require('uuid');
// import path
const path = require('path');
// import fs
const fs = require('fs');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create web server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// create comments api
// get comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// post comments
app.post('/api/comments', (req, res) => {
  // create new comment object
  const newComment = {
    id: uuidv4(),
    ...req.body,
  };
  // push new comment object to comments array
  comments.push(newComment);
  // send response
  res.json(newComment);
});

// put comments
app.put('/api/comments/:id', (req, res) => {
  // get id from request params
  const { id } = req.params;
  // get new comment data from request body
  const newCommentData = req.body;
  // find comment by id
  const comment = comments.find((comment) => comment.id === id);
  // if comment does not exist
  if (!comment) {
    // send error response
    res.status(404).json({ msg: `No comment with id ${id}` });
  }
  // update comment
  for (let key in newCommentData) {
    comment[key] = newCommentData[key];
  }
  // send response
  res.json(comment);
});

// delete comments
app.delete('/api/comments/:id', (req, res) => {
  // get id from request params
  const { id } = req.params;
  // find comment by id
  const comment = comments.find((comment) => comment.id === id);
  // if comment does not exist
  if (!comment) {
    // send error response
    res.status(404).json({ msg: `No comment with id ${id}` });
  }
});