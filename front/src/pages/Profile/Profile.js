import { useParams } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import Photo from '../../assets/profile.jpg'
import Post from '../../assets/eiffel.jpg'
import axios from 'axios'

import './Profile.css'
import { useState } from 'react'

const Profile = () => {
  let { nickname } = useParams()
  const [load, setLoad] = useState(false)
  const [userProfile, setUserProfile] = useState([])

  const obtenerPerfilUsuario = async e => {
    const response = await axios
      .get('http://localhost:8000/.netlify/functions/api/profileUserById', {
        params: { nickname: nickname }
      })
      .then(res => {
        console.log(res.data)
        // setUserProfile()
        setLoad(true)
      })
      .catch(err => {
        console.error(err)
      })
  }
  if (!load) {
    obtenerPerfilUsuario()
  }
  return (
    <Container>
      <Row className='header-profile py-5'>
        <Col sm={4} md={5} lg={5} xl={5} xxl={5} className='m-auto text-center'>
          <img src={Photo} height='150' className='rounded-circle' />
        </Col>
        <Col sm={8} md={7} lg={7} xl={7} xxl={7}>
          <div className='description-profile'>
            <h1>@{nickname}</h1>
            <Row className='stats-profile'>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2}>
                <p>
                  <b>3</b> posts
                </p>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2}>
                <p>
                  <b>3</b> followers
                </p>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2}>
                <p>
                  <b>3</b> followings
                </p>
              </Col>
            </Row>
            <h3>Nicolas</h3>
            <p className='description'>22 anios Dev Frontend Ing en Sistemas</p>
          </div>
        </Col>
      </Row>
      <hr></hr>
      <p className='text-center'>POSTS</p>
      <Row className='posts-profile pb-5'>
        <Col
          sm={6}
          md={5}
          lg={4}
          xl={3}
          xxl={3}
          className='content-post text-center'
        >
          <img src={Post} className='image-post' />
        </Col>
        <Col
          sm={6}
          md={5}
          lg={4}
          xl={3}
          xxl={3}
          className='content-post text-center'
        >
          <img src={Post} className='image-post' />
        </Col>
        <Col
          sm={6}
          md={5}
          lg={4}
          xl={3}
          xxl={3}
          className='content-post text-center'
        >
          <img src={Post} className='image-post' />
        </Col>
        <Col
          sm={6}
          md={5}
          lg={4}
          xl={3}
          xxl={3}
          className='content-post text-center'
        >
          <img src={Post} className='image-post' />
        </Col>
      </Row>
    </Container>
  )
}
export default Profile
