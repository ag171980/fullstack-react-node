import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  getAllUsers,
  getUserById,
  findByNickname,
  followUserByNickname,
  unfollowUserByNickname,
  crearUsuario,
  validarUsuario
} from '../controllers/userController.js'

import multer from 'multer'
const upload = multer({ dest: '../front/src/profiles/' })

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cors())
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.get('/findByNickname/:nickname', findByNickname)

router.post('/users/followUserByNickname', followUserByNickname)
router.post('/users/unfollowUserByNickname', unfollowUserByNickname)
router.post('/crearUsuario', upload.single('perfil_usuario'), crearUsuario)
router.post('/validarUsuario', validarUsuario)

export default router
