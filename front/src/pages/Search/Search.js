import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import PhotoDefault from '../../assets/default.jpg'

import './Search.css'
const Search = () => {
  const [loader, setLoader] = useState(false)
  const [usersFound, setUsersFound] = useState([])
  const [userToSearch, setUserToSearch] = useState('')
  const searchUserByNickname = async userToSearch => {
    const response = await axios.get(
      `http://localhost:8000/.netlify/functions/api/findByNickname/${userToSearch}`
    )
    if (response.status === 200) {
      setUsersFound(response.data)
      console.log(response.data)
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
            usersFound.map(user => (
              <div className='user'>
                <img src={PhotoDefault} className='photo-user' />
                <Link to={`/${user.nick_usuario}`} className='info-user'>
                  <h4>{user.nick_usuario}</h4>
                  <p>{user.nombre_usuario}</p>
                </Link>
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  )
}

export default Search
