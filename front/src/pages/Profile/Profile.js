import { useParams } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import Photo from '../../assets/profile.jpg'
import Post from '../../assets/eiffel.jpg'
import axios from 'axios'

import './Profile.css'
import { useState } from 'react'

const Profile = () => {
  let { nickname } = useParams()
  let datta = JSON.parse(localStorage.getItem('userLogged'))
  const [posts, setPosts] = useState([])
  const [statePosts, setStatePosts] = useState(false)
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

  const obtenerNick = async idUsuario => {
    const nickname = await axios.get(
      `http://localhost:8000/.netlify/functions/api/users/${idUsuario}`
    )
    return nickname.data.nick_usuario
  }

  const obtenerPosts = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/.netlify/functions/api/posts/${nickname}`
      )

      if (response.status === 200) {
        console.log(response.data)
        let nick = await obtenerNick(response.data[0].id_user)

        setPosts([])
        setStatePosts(true)
        console.log(response.data)
        response.data.forEach(element => {
          element.nick = nick
          setPosts(posts => [...posts, element])
        })
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }

  if (!load) {
    // obtenerPerfilUsuario()
  }
  if (!statePosts) {
    obtenerPosts()
  }

  return (
    <Container>
      <Sidebar />
      <Row className='header-profile py-5'>
        <Col sm={4} md={5} lg={5} xl={5} xxl={5} className='m-auto text-center'>
          <img src={Photo} height='150' className='rounded-circle' />
        </Col>
        <Col sm={8} md={7} lg={7} xl={7} xxl={7}>
          <div className='description-profile'>
            <h1>@{nickname}</h1>
            <Row className='stats-profile'>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
                <p>
                  <b>3</b> posts
                </p>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
                <p>
                  <b>3</b> followers
                </p>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
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
        {posts.length !== 0 &&
          posts.map((post, index) => (
            <Col
              key={index}
              sm={6}
              md={5}
              lg={4}
              xl={3}
              xxl={3}
              className='content-post text-center'
            >
              <img
                src={require(`../../posts/${post.imagen_post}`)}
                className='image-post'
              />
            </Col>
          ))}

        {posts.length === 0 && (
          <p className='text-center'>This user has not posts</p>
        )}
      </Row>
    </Container>
  )
}
export default Profile
