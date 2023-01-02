//importo el modelo

import { EmptyResultError } from 'sequelize'
import PostModel from '../models/PostModel.js'
import FollowerModel from '../models/FollowerModel.js'
import UserModel from '../models/UserModel.js'
/* METODOS DEL CRUD */
//MOSTRAR TODOS LOS REGISTROS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll()
    res.json(posts)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getPostById = async (req, res) => {
  try {
    const posts = await PostModel.findByPk(req.params.id)
    res.json(posts)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const getPostsByIdUser = async (req, res) => {
  let response = {
    posts: [],
    dataUser: {},
    follows: [],
    followings: []
  }
  try {
    const posts = await PostModel.findAll({
      where: {
        nick_usuario: req.params.nickname
      }
    })

    const user = await UserModel.findAll({
      attributes: [
        'nombre_usuario',
        'nick_usuario',
        'email_usuario',
        'perfil_usuario'
      ],
      where: {
        nick_usuario: req.params.nickname
      }
    })

    const followings = await FollowerModel.findAll({
      where: {
        nick_usuario_follower: req.params.nickname
      }
    })
    const follows = await FollowerModel.findAll({
      where: {
        nick_usuario_following: req.params.nickname
      }
    })
    response.dataUser.nombre_usuario = user[0].nombre_usuario
    response.dataUser.nick_usuario = user[0].nick_usuario
    response.dataUser.email_usuario = user[0].email_usuario
    response.dataUser.perfil_usuario = user[0].perfil_usuario
    response.posts = posts
    response.follows = follows
    response.followings = followings

    res.json(response)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const showPostsFromUsersIFollow = async (req, res) => {
  console.log(req.params.nickname)
  let postsResp = []
  try {
    const followings = await FollowerModel.findAll({
      attributes: ['nick_usuario_following'],
      where: {
        nick_usuario_follower: req.params.nickname
      }
    })

    for (let i = 0; i < followings.length; i++) {
      const posts = await PostModel.findAll({
        where: { nick_usuario: followings[i].nick_usuario_following }
      })
      for (let j = 0; j < posts.length; j++) {
        postsResp.push(posts[j])
      }
    }

    res.json(postsResp)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const crearPost = async (req, res) => {
  try {
    const posts = await PostModel.create(
      {
        id_user: req.body.id_user,
        titulo_post: req.body.titulo_post,
        descripcion_post: req.body.descripcion_post,
        imagen_post: req.file.filename,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        nick_usuario: req.body.nick_usuario
      },
      {
        fields: [
          'id_user',
          'titulo_post',
          'descripcion_post',
          'imagen_post',
          'createdAt',
          'updatedAt',
          'nick_usuario'
        ]
      }
    )
    res.json(posts)
  } catch (error) {
    res.json({ message: error.message })
  }
  // console.log(req.file)
  // console.log(req.body)
}
