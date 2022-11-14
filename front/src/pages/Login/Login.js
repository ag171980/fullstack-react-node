import axios from "axios";


const Login = () => {
    const validarUsuario = async (e) => {
        e.preventDefault();
        document.querySelector(".loading").classList.add("show")

        //toma de datos
        let data = {
            nick_usuario: document.querySelector("#nick_usuario").value,
            email_usuario: document.querySelector("#email_usuario").value,
        }
        //registro de datos
        const resp = await axios.post("http://localhost:8000/validarUsuario", data)
            .then((res) => {
                console.log(res.data)
                setTimeout(() => {
                    if (res.status === 200 && !res.data.message) {
                        document.querySelector(".loading").innerHTML = `
                        <div className="message-response">
                            <p>Iniciaste sesion correctamente!</p>
                        </div>
                        `

                        localStorage.setItem("userLogged", JSON.stringify(res.data))
                    } else {
                        document.querySelector(".loading").innerHTML = `
                        <div className="message-response">
                            <p>${res.data.message}</p>
                        </div>
                        `
                    }
                    setTimeout(() => {
                        document.querySelector(".loading").classList.remove("show")
                        window.location.href = "/home"
                    }, 2000);
                }, 2000);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (<>
        <form className="formulario_ingreso" onSubmit={validarUsuario}>
            <div className="loading">
                <div className="lds-dual-ring"></div>
            </div>
            <h2>Inicia Sesion</h2>
            <label htmlFor="nick_usuario">Nombre de usuario</label>
            <input type="text" name="nick_usuario" id="nick_usuario" required />
            <label htmlFor="email_usuario">Email</label>
            <input type="email" name="email_usuario" id="email_usuario" required />
            <button type="submit">Iniciar Sesion</button>
        </form>
    </>)
}
export default Login;