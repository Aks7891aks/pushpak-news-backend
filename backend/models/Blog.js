import mongoose from "mongoose";

/* BLOG SCHEMA */

const blogSchema = new mongoose.Schema(

  {

    title:{
      type:String,
      required:true,
      trim:true
    },

    slug:{
      type:String,
      required:true,
      unique:true
    },

    author:{
      type:String,
      required:true
    },

    category:{
      type:String,
      required:true
    },

    shortDescription:{
      type:String,
      required:true
    },

    content:{
      type:String,
      required:true
    },

    image:{
      type:String,
      default:""
    },

    tags:[
      {
        type:String
      }
    ],

    status:{
      type:String,
      enum:["draft","published","pending"],
      default:"draft"
    },

    featured:{
      type:Boolean,
      default:false
    },

    views:{
      type:Number,
      default:0
    }

  },

  {
    timestamps:true
  }

);

/* MODEL */

const Blog =
  mongoose.model("Blog",blogSchema);

export default Blog;