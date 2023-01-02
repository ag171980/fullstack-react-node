//importo el modelo

import { EmptyResultError, Op } from 'sequelize'
import UserModel from '../models/UserModel.js'
import FollowerModel from '../models/FollowerModel.js'
/* METODOS DEL CRUD */

//MOSTRAR TODOS LOS REGISTROS
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll()
    res.json(users)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getUserById = async (req, res) => {
  try {
    const users = await UserModel.findByPk(req.params.id)
    res.json(users)
  } catch (error) {
    res.json({ message: error.message })
  }
}
//buscador
export const findByNickname = async (req, res) => {
  //   console.log(req.params.nickname)
  try {
    const users = await UserModel.findAll({
      attributes: [
        'nick_usuario',
        'nombre_usuario',
        'email_usuario',
        'perfil_usuario'
      ],
      where: {
        nick_usuario: {
          [Op.like]: `%${req.params.nickname}%`
        }
      }
    })
    let newResponse = [{}]
    res.json(users)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const followUserByNickname = async (req, res) => {
  try {
    const followers = await FollowerModel.create(
      {
        nick_usuario_follower: req.body.nick_usuarioA,
        nick_usuario_following: req.body.nick_usuarioB,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      },
      {
        fields: [
          'nick_usuario_follower',
          'nick_usuario_following',
          'createdAt',
          'updatedAt'
        ]
      }
    )
    res.json(followers)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const unfollowUserByNickname = async (req, res) => {
  try {
    const followers = await FollowerModel.destroy({
      where: {
        nick_usuario_follower: req.body.nick_usuarioA,
        nick_usuario_following: req.body.nick_usuarioB
      }
    })
    res.json({ msg: 'Dejaste de seguirle' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const crearUsuario = async (req, res) => {
  console.log(req.file)
  try {
    const userExists = await UserModel.findOne({
      where: { email_usuario: req.body.email_usuario }
    })
    if (userExists === null) {
      const users = await UserModel.create(
        {
          nombre_usuario: req.body.nombre_usuario,
          email_usuario: req.body.email_usuario,
          nick_usuario: req.body.nick_usuario,
          perfil_usuario: req.file.filename,
          createdAt: req.body.createdAt,
          updatedAt: req.body.updatedAt
        },
        {
          fields: [
            'nombre_usuario',
            'nick_usuario',
            'email_usuario',
            'perfil_usuario',
            'createdAt',
            'updatedAt'
          ]
        }
      )
      res.json(users)
    } else {
      res.json({ message: 'hay un usuario con este correo' })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const validarUsuario = async (req, res) => {
  try {
    const userExists = await UserModel.findOne({
      where: {
        email_usuario: req.body.email_usuario,
        nick_usuario: req.body.nick_usuario
      }
    })
    if (userExists === null) {
      res.json({ message: 'El usuario y/o email no coinciden' })
    } else {
      res.json(userExists)
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}
