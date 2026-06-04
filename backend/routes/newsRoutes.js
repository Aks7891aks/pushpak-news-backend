import express from "express";
import News from "../models/News.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

/* =========================
   GET ALL NEWS
========================= */

router.get("/", async (req, res) => {

  try {

    const news = await News.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: news.length,
      news
    });

  } catch (error) {

    console.log("GET NEWS ERROR :", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

/* =========================
   GET SINGLE NEWS
========================= */

router.get("/:id", async (req, res) => {

  try {

    const news = await News.findById(req.params.id);

    if (!news) {

      return res.status(404).json({
        success: false,
        message: "News Not Found"
      });

    }

    res.status(200).json({
      success: true,
      news
    });

  } catch (error) {

    console.log("GET SINGLE NEWS ERROR :", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

/* =========================
   ADD NEWS
========================= */

router.post(

  "/add",

  upload.single("image"),

  async (req, res) => {

    try {

      console.log("BODY :", req.body);
      console.log("FILE :", req.file);

      const {
        title,
        content,
        category,
        author,
        videoUrl,
        breakingNews
      } = req.body;

      /* IMAGE URL */

      const imageUrl = req.file
        ? req.file.path
        : "https://via.placeholder.com/400x300";

      /* CREATE NEWS */

      const newNews = new News({

        title,
        content,
        category,
        author,
        videoUrl,

        breakingNews:
          breakingNews === "true",

        image: imageUrl,

        views: 0,
        likes: 0

      });

      await newNews.save();

      res.status(201).json({

        success: true,
        message: "News Added Successfully",
        news: newNews

      });

    } catch (error) {

      console.log("UPLOAD ERROR :", error);

      res.status(500).json({

        success: false,
        message: error.message

      });

    }

  }

);

/* =========================
   UPDATE NEWS
========================= */

router.put(

  "/update/:id",

  upload.single("image"),

  async (req, res) => {

    try {

      const {
        title,
        content,
        category,
        author,
        videoUrl,
        breakingNews
      } = req.body;

      const news = await News.findById(req.params.id);

      if (!news) {

        return res.status(404).json({

          success: false,
          message: "News Not Found"

        });

      }

      /* UPDATE DATA */

      news.title = title;
      news.content = content;
      news.category = category;
      news.author = author;
      news.videoUrl = videoUrl;

      news.breakingNews =
        breakingNews === "true";

      /* UPDATE IMAGE */

      if (req.file) {

        news.image = req.file.path;

      }

      await news.save();

      res.status(200).json({

        success: true,
        message: "News Updated Successfully",
        news

      });

    } catch (error) {

      console.log("UPDATE ERROR :", error);

      res.status(500).json({

        success: false,
        message: error.message

      });

    }

  }

);

/* =========================
   UPDATE NEWS VIEWS
========================= */

router.put(

  "/views/:id",

  async (req, res) => {

    try {

      const news = await News.findById(req.params.id);

      if (!news) {

        return res.status(404).json({

          success: false,
          message: "News Not Found"

        });

      }

      news.views += 1;

      await news.save();

      res.status(200).json({

        success: true,
        views: news.views

      });

    } catch (error) {

      console.log("VIEWS ERROR :", error);

      res.status(500).json({

        success: false,
        message: error.message

      });

    }

  }

);

/* =========================
   UPDATE NEWS LIKES
========================= */

router.put(

  "/likes/:id",

  async (req, res) => {

    try {

      const news = await News.findById(req.params.id);

      if (!news) {

        return res.status(404).json({

          success: false,
          message: "News Not Found"

        });

      }

      news.likes += 1;

      await news.save();

      res.status(200).json({

        success: true,
        likes: news.likes

      });

    } catch (error) {

      console.log("LIKES ERROR :", error);

      res.status(500).json({

        success: false,
        message: error.message

      });

    }

  }

);

/* =========================
   DELETE NEWS
========================= */

router.delete("/:id", async (req, res) => {

  try {

    const news = await News.findByIdAndDelete(
      req.params.id
    );

    if (!news) {

      return res.status(404).json({

        success: false,
        message: "News Not Found"

      });

    }

    res.status(200).json({

      success: true,
      message: "News Deleted Successfully"

    });

  } catch (error) {

    console.log("DELETE ERROR :", error);

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

});

export default router;