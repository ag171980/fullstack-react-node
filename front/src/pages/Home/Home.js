import axios from "axios";
import { useState } from "react";
import Post from "../../components/Post/Post";
import { Button, Modal, Form } from 'react-bootstrap'

const Home = () => {
    let datta = JSON.parse(localStorage.getItem("userLogged"))
    const [posts, setPosts] = useState([]);
    const [statePosts, setStatePosts] = useState(false);
    const [user, setUser] = useState(datta)
    const [selectedImage, setSelectedImage] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const obtenerPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/.netlify/functions/api/posts/${datta.id}`)
            if (response.status === 200) {
                setPosts([])
                setStatePosts(true)
                response.data.forEach(element => {
                    setPosts(posts => [...posts, element])
                });
                return true;
            }
            return false;
        } catch (err) {
            console.error(err)
            return false;
        }
    }
    const crearPost = async (e) => {
        e.preventDefault();
        var todayDate = new Date().toISOString().slice(0, 10);
        let data = {
            id_user: datta.id,
            titulo_post: document.querySelector("#titulo_post").value,
            descripcion_post: document.querySelector("#descripcion_post").value,
            imagen_post: selectedImage,
            createdAt: todayDate,
            updatedAt: todayDate
        }

        const resp = await axios.post("http://localhost:8000/.netlify/functions/api/crearPost", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                console.log(res.data)
                obtenerPosts()
                // setTimeout(() => {
                //     if (res.status === 200 && !res.data.message) {
                //         document.querySelector(".loading").innerHTML = `
                //     <div className="message-response">
                //         <p>Iniciaste sesion correctamente!</p>
                //     </div>
                //     `

                //         localStorage.setItem("userLogged", JSON.stringify(res.data))
                //     } else {
                //         document.querySelector(".loading").innerHTML = `
                //     <div className="message-response">
                //         <p>${res.data.message}</p>
                //     </div>
                //     `
                //     }
                //     setTimeout(() => {
                //         document.querySelector(".loading").classList.remove("show")
                //         window.location.href = "/home"
                //     }, 2000);
                // }, 2000);
            })
            .catch((err) => {
                console.error(err)
            })

    }

    if (!statePosts) {
        obtenerPosts()
    }
    return (
        <>
            <h1>Bienvenido {user.nombre_usuario}!</h1>
            <hr />
            <Button variant="primary" onClick={handleShow}>
                Crear Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea tu propio Post!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={crearPost} encType="multipart/form-data">
                        <Form.Group className="mb-3" controlId="titulo_post">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" placeholder="Mi primer post..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descripcion_post">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group controlId="imagenes_post" className="mb-3">
                            <Form.Label>Imagenes</Form.Label>
                            <Form.Control type="file" name="imagenes_post" multiple onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <hr />
            <h2>Estos son tus posts:</h2>
            <div className="posts">
                {posts.map((post, index) => <Post post={post} key={index} />



                )}
            </div>
        </>
    )
}

export default Home;