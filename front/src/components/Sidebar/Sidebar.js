import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'

import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { BiMessageAlt, BiLogOut, BiAddToQueue } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { Button, Modal, Form, Alert } from 'react-bootstrap'
import './Sidebar.css'
export const Sidebar = () => {
  let datta = JSON.parse(localStorage.getItem('userLogged'))
  const [stateAlert, setStateAlert] = useState(false)
  const [show, setShow] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const crearPost = async e => {
    e.preventDefault()
    var todayDate = new Date().toISOString().slice(0, 10)
    let data = {
      id_user: datta.id,
      titulo_post: document.querySelector('#titulo_post').value,
      descripcion_post: document.querySelector('#descripcion_post').value,
      imagen_post: selectedImage,
      createdAt: todayDate,
      updatedAt: todayDate,
      nick_usuario: datta.nick_usuario
    }

    await axios
      .post('http://localhost:8000/.netlify/functions/api/crearPost', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setStateAlert(true)
        // console.log(res.data)
        // obtenerPosts()
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
      .catch(err => {
        console.error(err)
      })
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className='Sidebar'>
      {stateAlert && (
        <Alert
          variant='success'
          style={{ position: 'fixed', top: '10px', left: '10%', width: '80vw' }}
        ></Alert>
      )}
      <div className='logo'>
        {/* <img src={Logo} /> */}
        <h1>Meety</h1>
      </div>
      <div className='navigate-social'>
        <div className='link'>
          <AiOutlineHome />
          <Link to='/home'>Feed</Link>
        </div>
        <div className='link'>
          <AiOutlineSearch />
          <Link to='/search'>Search</Link>
        </div>
        <div className='link'>
          <BiMessageAlt />
          <Link to='/messages'>Messages</Link>
        </div>
        <div className='link'>
          <FaUserFriends />
          <Link to='/friends'>Friends</Link>
        </div>
        <div className='link'>
          <CgProfile />
          <Link to={`/${datta.nick_usuario}`}>My Profile</Link>
        </div>
        <div className='link'>
          <BiLogOut />

          <a>Logout</a>
        </div>
        <div className='link' onClick={handleShow}>
          <BiAddToQueue />
          <a>New Post</a>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={crearPost} encType='multipart/form-data'>
              <Form.Group className='mb-3' controlId='titulo_post'>
                <Form.Label>Titulo</Form.Label>
                <Form.Control type='text' placeholder='Mi primer post...' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='descripcion_post'>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as='textarea' rows={3} />
              </Form.Group>
              <Form.Group controlId='imagenes_post' className='mb-3'>
                <Form.Label>Imagenes</Form.Label>
                <Form.Control
                  type='file'
                  name='imagenes_post'
                  multiple
                  onChange={event => {
                    setSelectedImage(event.target.files[0])
                  }}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Crear
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
