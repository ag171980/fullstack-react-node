import { useState } from 'react'
import { validarUsuario } from '../../api/api'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Container } from 'react-bootstrap'

const Login = () => {
  const navigate = useNavigate()

  const Swal = require('sweetalert2')
  const [message, setMessage] = useState('Iniciaste sesion correctamente')
  const [loading, setLoading] = useState(false)

  const handleForm = async e => {
    e.preventDefault()
    setLoading(true)

    //toma de datos
    let data = {
      nick_usuario: document.querySelector('#nick_usuario').value,
      email_usuario: document.querySelector('#email_usuario').value
    }
    //registro de datos
    await validarUsuario(data)
      .then(res => {
        console.log(res.data)
        setTimeout(() => {
          if (res.data.message) {
            setMessage(res.data.message)
          }
          if (res.status === 200) {
            setLoading(false)
            Swal.fire({
              text: message,
              icon:
                message === 'Iniciaste sesion correctamente'
                  ? 'success'
                  : 'error'
            })
            localStorage.setItem('userLogged', JSON.stringify(res.data))
          }
          setTimeout(() => {
            if (!res.data.message) {
              Swal.close()
              navigate('/home')
            }
          }, 2000)
        }, 2000)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Container className='login pt-4 pl-3 pr-3 col-3'>
      <h1 className='text-center'>Meety</h1>
      <Form onSubmit={handleForm}>
        {loading && (
          <div className='loading'>
            <div className='lds-dual-ring'></div>
          </div>
        )}
        <Form.Group className='mb-3' controlId='email_usuario'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='joe@123.com' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='nick_usuario'>
          <Form.Label>Nickname</Form.Label>
          <Form.Control type='text' placeholder='JoeDoe21' required />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='button btn-block w-100 mt-2'
        >
          Iniciar Sesion
        </Button>
        <div className='text-center my-3'>
          <Link to='/'>o Registrate</Link>
        </div>
      </Form>
    </Container>
  )
}
export default Login
