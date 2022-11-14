//importo el modelo


import { EmptyResultError } from "sequelize";
import PostModel from "../models/PostModel.js";
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
    try {
        const posts = await PostModel.findAll({
            where: {
                id_user: req.params.idUser
            }
        });
        res.json(posts)
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
                updatedAt: req.body.updatedAt
            }, { fields: ['id_user', 'titulo_post', 'descripcion_post', 'imagen_post', 'createdAt', 'updatedAt'] }
        )
        res.json(posts)
    } catch (error) {
        res.json({ message: error.message })
    }
    // console.log(req.file)
    // console.log(req.body)
}

