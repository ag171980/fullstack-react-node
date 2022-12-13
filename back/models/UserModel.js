// importar la conexion a la base de datos

import db from '../database/db.js'

//sequelize

import { DataTypes } from 'sequelize'

const UserModel = db.define('usuarios', {
  nombre_usuario: { type: DataTypes.STRING },
  email_usuario: { type: DataTypes.STRING },
  nick_usuario: { type: DataTypes.STRING },
  perfil_usuario: { type: DataTypes.STRING }
})

export default UserModel
