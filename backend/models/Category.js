import mongoose from "mongoose";

/* CATEGORY SCHEMA */

const categorySchema = new mongoose.Schema(

  {

    name:{
      type:String,
      required:true,
      unique:true,
      trim:true
    },

    slug:{
      type:String,
      required:true,
      unique:true
    },

    description:{
      type:String,
      default:""
    },

    image:{
      type:String,
      default:""
    },

    featured:{
      type:Boolean,
      default:false
    },

    status:{
      type:String,
      enum:["active","inactive"],
      default:"active"
    }

  },

  {
    timestamps:true
  }

);

/* MODEL */

const Category =
  mongoose.model("Category",categorySchema);

export default Category;