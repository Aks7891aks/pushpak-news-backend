import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

/* GET ALL VIDEOS */

router.get("/",async(req,res)=>{

  try{

    const videos =
      await Video.find().sort({ createdAt:-1 });

    res.json({

      success:true,

      total:videos.length,

      videos

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET SINGLE VIDEO */

router.get("/:id",async(req,res)=>{

  try{

    const singleVideo =
      await Video.findById(req.params.id);

    if(!singleVideo){

      return res.status(404).json({

        success:false,

        message:"Video Not Found"

      });

    }

    res.json({

      success:true,

      video:singleVideo

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* CREATE VIDEO */

router.post("/",async(req,res)=>{

  try{

    const newVideo =
      await Video.create(req.body);

    res.status(201).json({

      success:true,

      message:"Video Created Successfully",

      video:newVideo

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* UPDATE VIDEO */

router.put("/:id",async(req,res)=>{

  try{

    const updatedVideo =
      await Video.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true
        }

      );

    if(!updatedVideo){

      return res.status(404).json({

        success:false,

        message:"Video Not Found"

      });

    }

    res.json({

      success:true,

      message:"Video Updated Successfully",

      video:updatedVideo

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* DELETE VIDEO */

router.delete("/:id",async(req,res)=>{

  try{

    const deletedVideo =
      await Video.findByIdAndDelete(req.params.id);

    if(!deletedVideo){

      return res.status(404).json({

        success:false,

        message:"Video Not Found"

      });

    }

    res.json({

      success:true,

      message:"Video Deleted Successfully"

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

/* GET LIVE VIDEOS */

router.get("/live/all",async(req,res)=>{

  try{

    const liveVideos =
      await Video.find({ isLive:true });

    res.json({

      success:true,

      total:liveVideos.length,

      liveVideos

    });

  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});

export default router;