import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { getAllPosts, getPostById, getPostsByIdUser, crearPost } from "../controllers/postController.js"

import multer from 'multer'
const upload = multer({ dest: '../front/src/posts/' })

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
router.get("/posts", getAllPosts)
router.get("/post/:id", getPostById)
router.get("/posts/:nickname", getPostsByIdUser)

router.post("/crearPost", upload.single("imagen_post"), crearPost)




export default router