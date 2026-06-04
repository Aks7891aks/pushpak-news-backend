import express from "express";

import Comment from "../models/commentModel.js";

const router = express.Router();

/* ADD COMMENT */

router.post(

  "/",

  async (req,res)=>{

    try{

      const newComment =
        new Comment(req.body);

      await newComment.save();

      res.status(201).json({

        success:true,

        message:
          "Comment Added Successfully",

        comment:newComment

      });

    }

    catch(error){

      res.status(500).json({

        success:false,

        message:error.message

      });

    }

  }

);

/* GET COMMENTS */

router.get(

  "/:newsId",

  async (req,res)=>{

    try{

      const comments =
        await Comment.find({

          newsId:String(req.params.newsId)

        })

        .sort({ createdAt:-1 });

      res.json({

        success:true,

        comments

      });

    }

    catch(error){

      res.status(500).json({

        success:false,

        message:error.message

      });

    }

  }

);

export default router;