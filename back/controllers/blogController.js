//importo el modelo


import { EmptyResultError } from "sequelize";
import BlogModel from "../models/BlogModel.js";
/* METODOS DEL CRUD */

//MOSTRAR TODOS LOS REGISTROS
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.findAll()
        res.json(blogs)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getBlogById = async (req, res) => {
    try {
        const blogs = await BlogModel.findByPk(req.params.id)
        res.json(blogs)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.create({ title: req.body.title, content: req.body.content, createdAt: req.body.createdAt, updatedAt: req.body.updatedAt }, { fields: ['title', 'content', 'createdAt', 'updatedAt'] })
        res.json(blogs)
    } catch (error) {
        res.json({ message: error.message })
    }
}