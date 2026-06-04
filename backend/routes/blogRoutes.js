import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

/* GET ALL BLOGS */

router.get("/",async(req,res)=>{

  try{

    const blogs =
      await Blog.find().sort({ createdAt:-1 });

    res.json({

      success:true,

      total:blogs.length,

      blogs

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET SINGLE BLOG */

router.get("/:id",async(req,res)=>{

  try{

    const singleBlog =
      await Blog.findById(req.params.id);

    if(!singleBlog){

      return res.status(404).json({

        success:false,

        message:"Blog Not Found"

      });

    }

    res.json({

      success:true,

      blog:singleBlog

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* CREATE BLOG */

router.post("/",async(req,res)=>{

  try{

    const newBlog =
      await Blog.create(req.body);

    res.status(201).json({

      success:true,

      message:"Blog Created Successfully",

      blog:newBlog

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* UPDATE BLOG */

router.put("/:id",async(req,res)=>{

  try{

    const updatedBlog =
      await Blog.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true
        }

      );

    if(!updatedBlog){

      return res.status(404).json({

        success:false,

        message:"Blog Not Found"

      });

    }

    res.json({

      success:true,

      message:"Blog Updated Successfully",

      blog:updatedBlog

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* DELETE BLOG */

router.delete("/:id",async(req,res)=>{

  try{

    const deletedBlog =
      await Blog.findByIdAndDelete(req.params.id);

    if(!deletedBlog){

      return res.status(404).json({

        success:false,

        message:"Blog Not Found"

      });

    }

    res.json({

      success:true,

      message:"Blog Deleted Successfully"

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

export default router;