import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";

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

    return (
        <Container className=" mt-4 pl-3 pr-3">
            <h1 className="text-center">Meety</h1>
            <Form onSubmit={validarUsuario}>
                <div className="loading">
                    <div className="lds-dual-ring"></div>
                </div>
                <Form.Group className="mb-3" controlId="email_usuario">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="joe@123.com" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nick_usuario">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" placeholder="JoeDoe21" required />
                </Form.Group>


                <Button variant="primary" type="submit" className="button btn-block w-100 mt-2">
                    Iniciar Sesion
                </Button>
            </Form>
            {/* <form className="formulario_ingreso" onSubmit={validarUsuario}>
            <div className="loading">
                <div className="lds-dual-ring"></div>
            </div>
            <h2>Inicia Sesion</h2>
            <label htmlFor="nick_usuario">Nombre de usuario</label>
            <input type="text" name="nick_usuario" id="nick_usuario" required />
            <label htmlFor="email_usuario">Email</label>
            <input type="email" name="email_usuario" id="email_usuario" required />
            <button type="submit">Iniciar Sesion</button>
        </form> */}
        </Container>
    )
}
export default Login;