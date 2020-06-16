const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postText: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
  },
  comments: [
      {
          user: {
              type: Schema.Types.ObjectId,
              ref: 'users'
          },
          commentId: {
            type:String,
            required: true
          },
          author: {
            type:String,
            required: true
          },
          text: {
              type: String,
              required: true
          },
          name: {
              type: String,
          },
          avatar: {
              type: String,
          },
          date: {
              type: String,

          },
          parentId: {
            type: String,
            required: true
          }
      }
  ]
});

module.exports = Post = mongoose.model("post", PostSchema);
