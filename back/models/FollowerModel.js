// importar la conexion a la base de datos

import db from '../database/db.js'

//sequelize

import { DataTypes } from 'sequelize'

const PostModel = db.define('follows', {
  nick_usuario_follower: { type: DataTypes.STRING },
  nick_usuario_following: { type: DataTypes.STRING }
})

export default PostModel
