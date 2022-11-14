// importar la conexion a la base de datos

import db from "../database/db.js"

//sequelize

import { DataTypes } from "sequelize"

const PostModel = db.define("posts", {
    id_user: { type: DataTypes.INTEGER },
    titulo_post: { type: DataTypes.STRING },
    descripcion_post: { type: DataTypes.STRING },
    imagen_post: { type: DataTypes.STRING },
})

export default PostModel