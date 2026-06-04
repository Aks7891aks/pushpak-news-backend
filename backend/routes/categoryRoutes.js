import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

/* GET ALL CATEGORIES */

router.get("/",async(req,res)=>{

  try{

    const categories =
      await Category.find().sort({ createdAt:-1 });

    res.json({

      success:true,

      total:categories.length,

      categories

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET SINGLE CATEGORY */

router.get("/:id",async(req,res)=>{

  try{

    const singleCategory =
      await Category.findById(req.params.id);

    if(!singleCategory){

      return res.status(404).json({

        success:false,

        message:"Category Not Found"

      });

    }

    res.json({

      success:true,

      category:singleCategory

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* CREATE CATEGORY */

router.post("/",async(req,res)=>{

  try{

    const newCategory =
      await Category.create(req.body);

    res.status(201).json({

      success:true,

      message:"Category Created Successfully",

      category:newCategory

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* UPDATE CATEGORY */

router.put("/:id",async(req,res)=>{

  try{

    const updatedCategory =
      await Category.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true
        }

      );

    if(!updatedCategory){

      return res.status(404).json({

        success:false,

        message:"Category Not Found"

      });

    }

    res.json({

      success:true,

      message:"Category Updated Successfully",

      category:updatedCategory

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* DELETE CATEGORY */

router.delete("/:id",async(req,res)=>{

  try{

    const deletedCategory =
      await Category.findByIdAndDelete(req.params.id);

    if(!deletedCategory){

      return res.status(404).json({

        success:false,

        message:"Category Not Found"

      });

    }

    res.json({

      success:true,

      message:"Category Deleted Successfully"

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET ACTIVE CATEGORIES */

router.get("/status/active",async(req,res)=>{

  try{

    const activeCategories =
      await Category.find({

        status:"active"

      });

    res.json({

      success:true,

      total:activeCategories.length,

      activeCategories

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

export default router;