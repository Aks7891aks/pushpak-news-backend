import mongoose from "mongoose";

/* VIDEO SCHEMA */

const videoSchema = new mongoose.Schema(

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

    category:{
      type:String,
      required:true
    },

    description:{
      type:String,
      required:true
    },

    videoUrl:{
      type:String,
      required:true
    },

    thumbnail:{
      type:String,
      default:""
    },

    duration:{
      type:String,
      default:""
    },

    isLive:{
      type:Boolean,
      default:false
    },

    featured:{
      type:Boolean,
      default:false
    },

    status:{
      type:String,
      enum:["draft","published","pending"],
      default:"draft"
    },

    views:{
      type:Number,
      default:0
    },

    uploadedBy:{
      type:String,
      default:"Admin"
    }

  },

  {
    timestamps:true
  }

);

/* MODEL */

const Video =
  mongoose.model("Video",videoSchema);

export default Video;