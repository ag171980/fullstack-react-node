import axios from "axios";

import "./Index.css"
const Index = () => {

    const registrarUsuario = async (e) => {
        document.querySelector(".loading").classList.add("show")
        e.preventDefault();
        //toma de datos
        var todayDate = new Date().toISOString().slice(0, 10);
        let data = {
            nombre_usuario: document.querySelector("#nombre_usuario").value,
            email_usuario: document.querySelector("#email_usuario").value,
            nick_usuario: document.querySelector("#nick_usuario").value,
            createdAt: todayDate,
            updatedAt: todayDate
        }
        //registro de datos
        const resp = await axios.post("http://localhost:8000/.netlify/functions/api/crearUsuario", data)
            .then((res) => {

                setTimeout(() => {
                    if (res.status === 200 && !res.data.message) {
                        document.querySelector(".loading").innerHTML = `
                        <div className="message-response">
                            <p>Registrado correctamente!</p>
                        </div>
                        `
                    } else {
                        document.querySelector(".loading").innerHTML = `
                        <div className="message-response">
                            <p>${res.data.message}</p>
                        </div>
                        `
                    }
                    setTimeout(() => {
                        document.querySelector(".loading").classList.remove("show")
                        window.location.href = "/login"
                    }, 2000);
                }, 2000);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <form className="formulario_registro" onSubmit={registrarUsuario}>
                <div className="loading">
                    <div className="lds-dual-ring"></div>
                </div>
                <h2>Registrate</h2>
                <label htmlFor="nombre_usuario">Nombre</label>
                <input type="text" name="nombre_usuario" id="nombre_usuario" required />
                <label htmlFor="email_usuario">Email</label>
                <input type="email" name="email_usuario" id="email_usuario" required />
                <label htmlFor="nick_usuario">Nombre de usuario</label>
                <input type="text" name="nick_usuario" id="nick_usuario" required />
                <button type="submit">Registrarse</button>
            </form>
        </>
    )
}

export default Index;