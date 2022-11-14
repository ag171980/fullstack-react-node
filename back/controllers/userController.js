//importo el modelo


import { EmptyResultError } from "sequelize";
import UserModel from "../models/UserModel.js";
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

export const crearUsuario = async (req, res) => {
    try {
        const userExists = await UserModel.findOne({ where: { email_usuario: req.body.email_usuario } })
        if (userExists === null) {
            const users = await UserModel.create(
                {
                    nombre_usuario: req.body.nombre_usuario,
                    email_usuario: req.body.email_usuario,
                    nick_usuario: req.body.nick_usuario,
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt
                }, { fields: ['nombre_usuario', 'nick_usuario', 'email_usuario', 'createdAt', 'updatedAt'] })
            res.json(users)
        } else {
            res.json({ message: "hay un usuario con este correo" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const validarUsuario = async (req, res) => {
    try {
        const userExists = await UserModel.findOne(
            {
                where:
                {
                    email_usuario: req.body.email_usuario,
                    nick_usuario: req.body.nick_usuario
                }
            })
        if (userExists === null) {
            res.json({ message: "El usuario y/o email no coinciden" })
        } else {
            res.json(userExists)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}