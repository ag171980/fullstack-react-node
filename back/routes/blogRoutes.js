import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { getAllBlogs, getBlogById, createBlog } from "../controllers/blogController.js"

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/blogs", getAllBlogs)
router.get("/blogs/:id", getBlogById)

router.post("/createBlog", createBlog)
/* router.get ("/:id",getBlog)
router.post ("/",createBlog)
router.put("/:id",updateBlog)
router.delete("/:id",deleteBlog)
 
 */
export default router