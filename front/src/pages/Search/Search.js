import { useState } from 'react'
import { Link } from 'react-router-dom'
//component(s)
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
//media
import PhotoDefault from '../../assets/default.jpg'
//api
import { buscarPorNick } from '../../api/api'
//style
import './Search.css'

const Search = () => {
  const datta = JSON.parse(localStorage.getItem('userLogged'))
  const [loader, setLoader] = useState(false)
  const [usersFound, setUsersFound] = useState([])
  const [userToSearch, setUserToSearch] = useState('')

  const searchUserByNickname = async userToSearch => {
    if (userToSearch.length > 0) {
      const response = await buscarPorNick(userToSearch)
      if (response.status === 200) {
        setUsersFound(response.data)
        console.log(response.data)
      }
    }
  }

  const handleChange = e => {
    if (e.target.value.length !== 0) {
      setLoader(true)
      setUserToSearch(e.target.value)
      setTimeout(() => {
        searchUserByNickname(userToSearch)
        setLoader(false)
      }, 1000)
    } else {
      setLoader(false)
    }
  }
  return (
    <Container>
      <Sidebar />
      <Row>
        <Col xxl={2}></Col>
        <Col xxl={10}>
          <h1 className='text-center'>Search</h1>
          <div className='buscador'>
            <input
              type='text'
              required
              className='inputBuscador'
              placeholder='Search...'
              onChange={handleChange}
            />
            {loader && <div className='custom-loader'></div>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xxl={2}></Col>
        <Col xxl={10}>
          {usersFound &&
            usersFound.map(
              (user, index) =>
                user.nick_usuario !== datta.nick_usuario && (
                  <Link
                    to={`/${user.nick_usuario}`}
                    className='user'
                    key={index}
                  >
                    <img
                      src={
                        user.perfil_usuario
                          ? require(`../../profiles/${user.perfil_usuario}`)
                          : PhotoDefault
                      }
                      alt={`profile of ${user.perfil_usuario}`}
                      className='photo-user'
                    />
                    <div className='info-user'>
                      <h4>{user.nick_usuario}</h4>
                      <p>{user.nombre_usuario}</p>
                    </div>
                  </Link>
                )
            )}
          {usersFound.length === 0 && (
            <p className='text-center'>
              there are not users named: <b>{userToSearch}</b>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Search
