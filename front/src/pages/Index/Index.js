import { useState } from 'react'

import { registrarUsuario } from '../../api/api'
import { Button, Form, Container } from 'react-bootstrap'
import './Index.css'
import { Link, useNavigate } from 'react-router-dom'
const Index = () => {
  const navigate = useNavigate()

  const Swal = require('sweetalert2')
  const [selectedImage, setSelectedImage] = useState(null)
  const [message, setMessage] = useState('Usuario registrado correctamente')
  const [loading, setLoading] = useState(false)

  const handleForm = async e => {
    e.preventDefault()
    setLoading(true)
    //toma de datos
    const todayDate = new Date().toISOString().slice(0, 10)
    let data = {
      nombre_usuario: document.querySelector('#nombre_usuario').value,
      email_usuario: document.querySelector('#email_usuario').value,
      nick_usuario: document.querySelector('#nick_usuario').value,
      perfil_usuario: selectedImage,
      createdAt: todayDate,
      updatedAt: todayDate
    }
    //registro de datos
    await registrarUsuario(data)
      .then(res => {
        setTimeout(() => {
          if (res.data.message) {
            setMessage(res.data.message)
          }
          if (res.status === 200) {
            setLoading(false)
            Swal.fire({
              text: message,
              icon:
                message === 'Usuario registrado correctamente'
                  ? 'success'
                  : 'error'
            })
          }
          setTimeout(() => {
            if (!res.data.message) {
              Swal.close()
              navigate('/login')
            }
          }, 2000)
        }, 2000)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Container className='index pt-4 pl-3 pr-3 col-3'>
      <h1 className='text-center'>Meety</h1>
      <Form onSubmit={handleForm} encType='multipart/form-data'>
        {loading && (
          <div className='loading'>
            <div className='lds-dual-ring'></div>
          </div>
        )}

        <Form.Group className='mb-3' controlId='nombre_usuario'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type='text' placeholder='Joe Doe' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email_usuario'>
          <Form.Label>Email {Number('')}</Form.Label>
          <Form.Control type='email' placeholder='joe@123.com' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='nick_usuario'>
          <Form.Label>Nickname</Form.Label>
          <Form.Control type='text' placeholder='JoeDoe21' required />
        </Form.Group>

        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Foto de Perfil</Form.Label>
          <Form.Control
            type='file'
            onChange={event => {
              setSelectedImage(event.target.files[0])
            }}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='button btn-block w-100 mt-2'
        >
          Registrar
        </Button>
        <div className='text-center my-3'>
          <Link to='/login'>o Iniciar Sesion</Link>
        </div>
      </Form>
    </Container>
  )
}

export default Index
