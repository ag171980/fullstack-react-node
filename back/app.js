import express from "express"
import serverless from 'serverless-http'
import cors from "cors"
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import db from "./database/db.js"

const app = express()

app.use("/.netlify/functions/api", blogRoutes)
app.use("/.netlify/functions/api", userRoutes)
app.use("/.netlify/functions/api", postRoutes)
/* app.use("/registrarme",blogRegister) */

app.use(cors());

app.use(express.json()) //analiza las solicitudes JSON entrantes y coloca los datos analizados en formato req.body

//base de datos
try {
    await db.authenticate()
    console.log("conexion a la BD OK")
} catch (error) {
    console.log(`conexion fallida por el error ${error}`)
}



const port = 8000
app.listen(port, () => {
    console.log(`Servidor ok en el puerto ${port}`)
})

export default serverless(app)