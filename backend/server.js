/* =========================
   PUSHPAK NEWS BACKEND
========================= */

/* IMPORTS */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

/* ROUTES */

import newsRoutes from "./routes/newsRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

/* MODELS */

import News from "./models/News.js";

/* CONFIG */

dotenv.config();

/* EXPRESS APP */

const app = express();

/* __dirname */

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended:true
  })
);

app.use(morgan("dev"));

/* =========================
   STATIC UPLOADS
========================= */

app.use(

  "/uploads",

  express.static(

    path.join(
      __dirname,
      "uploads"
    )

  )

);

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(
  process.env.MONGO_URI
)

.then(()=>{

  console.log(
    "MongoDB Connected Successfully"
  );

})

.catch((error)=>{

  console.log(
    "MongoDB Connection Error :",
    error
  );

});

/* =========================
   API ROUTES
========================= */

app.use(
  "/api/news",
  newsRoutes
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.use(
  "/api/videos",
  videoRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

/* =========================
   UPDATE NEWS API
========================= */

app.put(

  "/api/news/:id",

  async (req,res)=>{

    try{

      const updatedNews =

        await News.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new:true
          }

        );

      res.json({

        success:true,

        message:
          "News Updated Successfully",

        updatedNews

      });

    }

    catch(error){

      console.log(
        "UPDATE ERROR :",
        error
      );

      res.status(500).json({

        success:false,

        message:error.message

      });

    }

  }

);

/* =========================
   DELETE NEWS API
========================= */

app.delete(

  "/api/news/:id",

  async (req,res)=>{

    try{

      await News.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success:true,

        message:
          "News Deleted Successfully"

      });

    }

    catch(error){

      console.log(
        "DELETE ERROR :",
        error
      );

      res.status(500).json({

        success:false,

        message:error.message

      });

    }

  }

);

/* =========================
   HOME ROUTE
========================= */

app.get("/",(req,res)=>{

  res.json({

    success:true,

    message:
      "Pushpak News Backend Running Successfully"

  });

});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(

  (error,req,res,next)=>{

    console.log(

      "GLOBAL ERROR :",
      error

    );

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

);

/* =========================
   404 ROUTE
========================= */

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:
      "API Route Not Found"

  });

});

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT,()=>{

  console.log(

    `Pushpak News Server Running On Port ${PORT}`

  );

});