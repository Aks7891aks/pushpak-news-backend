import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* GENERATE JWT TOKEN */

const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn:"30d"
    }

  );

};

/* REGISTER USER */

router.post("/register",async(req,res)=>{

  try{

    const {
      name,
      email,
      password,
      role
    } = req.body;

    /* CHECK USER */

    const userExists =
      await User.findOne({ email });

    if(userExists){

      return res.status(400).json({

        success:false,

        message:"User already exists"

      });

    }

    /* CREATE USER */

    const user =
      await User.create({

        name,
        email,
        password,
        role

      });

    if(user){

      res.status(201).json({

        success:true,

        message:"User Registered Successfully",

        token:generateToken(user._id),

        user:{

          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role

        }

      });

    }else{

      res.status(400).json({

        success:false,

        message:"Invalid User Data"

      });

    }

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* LOGIN USER */

router.post("/login",async(req,res)=>{

  try{

    const {
      email,
      password
    } = req.body;

    /* FIND USER */

    const user =
      await User.findOne({ email });

    /* MATCH PASSWORD */

    if(
      user &&
      (await user.matchPassword(password))
    ){

      res.json({

        success:true,

        message:"Login Successful",

        token:generateToken(user._id),

        user:{

          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role

        }

      });

    }else{

      res.status(401).json({

        success:false,

        message:"Invalid Email Or Password"

      });

    }

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET PROFILE */

router.get("/profile",async(req,res)=>{

  try{

    const users =
      await User.find();

    res.json({

      success:true,

      total:users.length,

      users

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

export default router;