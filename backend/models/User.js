import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* USER SCHEMA */

const userSchema = new mongoose.Schema(

  {

    name:{
      type:String,
      required:true,
      trim:true
    },

    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },

    password:{
      type:String,
      required:true,
      minlength:6
    },

    profileImage:{
      type:String,
      default:""
    },

    role:{
      type:String,
      enum:["admin","journalist","editor"],
      default:"journalist"
    },

    bio:{
      type:String,
      default:""
    },

    phone:{
      type:String,
      default:""
    },

    isActive:{
      type:Boolean,
      default:true
    }

  },

  {
    timestamps:true
  }

);

/* HASH PASSWORD */

userSchema.pre("save",async function(next){

  if(!this.isModified("password")){

    next();

  }

  const salt =
    await bcrypt.genSalt(10);

  this.password =
    await bcrypt.hash(this.password,salt);

});

/* MATCH PASSWORD */

userSchema.methods.matchPassword =
  async function(enteredPassword){

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );

  };

/* MODEL */

const User =
  mongoose.model("User",userSchema);

export default User;