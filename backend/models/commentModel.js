/* MONGOOSE */

import mongoose from "mongoose";

/* COMMENT SCHEMA */

const commentSchema = new mongoose.Schema(

  {

    newsId:{

      type:String,

      required:true

    },

    name:{

      type:String,

      required:true

    },

    comment:{

      type:String,

      required:true

    }

  },

  {

    timestamps:true

  }

);

/* MODEL */

const Comment =
  mongoose.model(
    "Comment",
    commentSchema
  );

export default Comment;