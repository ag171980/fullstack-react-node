import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
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
        <Container className="index pt-4 pl-3 pr-3 col-3">
            <h1 className="text-center">Meety</h1>
            <Form onSubmit={registrarUsuario}>
                <div className="loading">
                    <div className="lds-dual-ring"></div>
                </div>
                <Form.Group className="mb-3" controlId="nombre_usuario">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Joe Doe" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email_usuario">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="joe@123.com" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nick_usuario">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" placeholder="JoeDoe21" required />
                </Form.Group>


                <Button variant="primary" type="submit" className="button btn-block w-100 mt-2">
                    Registrar
                </Button>
            </Form>
            
        </Container>
    )
}

export default Index;