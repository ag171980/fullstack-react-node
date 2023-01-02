import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//component(s)
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
//media
import Default from '../../assets/default.jpg'
//api
import { obtenerPostsPorNickname, obtenerNickPorId } from '../../api/posts'
import { seguirUsuarioPorNick, noSeguirUsuarioPorNick } from '../../api/users'
//style
import './Profile.css'

const Profile = () => {
  let { nickname } = useParams()
  const datta = JSON.parse(localStorage.getItem('userLogged'))

  const [posts, setPosts] = useState([])
  const [followUser, setFollowUser] = useState(false)
  const [follows, setFollows] = useState([])
  const [followings, setFollowings] = useState([])
  const [statePosts, setStatePosts] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const [showFollows, setShowFollows] = useState(false)
  const [showFollowings, setShowFollowings] = useState(false)

  const handleCloseFollows = () => setShowFollows(false)
  const handleShowFollows = () => setShowFollows(true)
  const handleCloseFollowings = () => setShowFollowings(false)
  const handleShowFollowings = () => setShowFollowings(true)

  const obtenerNick = async idUsuario => {
    const nickname = await obtenerNickPorId(idUsuario)
    return nickname.data.nick_usuario
  }

  const obtenerPosts = async () => {
    try {
      let response = await obtenerPostsPorNickname(nickname)

      if (response.status === 200) {
        console.log(response.data)
        if (response.data.posts.length !== 0) {
          let nick = await obtenerNick(response.data.posts[0].id_user)
          setPosts([])
          response.data.posts.forEach(element => {
            element.nick = nick
            setPosts(posts => [...posts, element])
          })
        }
        setStatePosts(true)
        setUserProfile(response.data.dataUser)
        setFollows(response.data.follows)
        setFollowings(response.data.followings)

        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const seguirUsuario = async (nick_usuarioA, nick_usuarioB) => {
    try {
      const todayDate = new Date().toISOString().slice(0, 10)
      const body = {
        nick_usuarioA: nick_usuarioA,
        nick_usuarioB: nick_usuarioB,
        createdAt: todayDate,
        updatedAt: todayDate
      }
      const response = await seguirUsuarioPorNick(body)
      if (response.status === 200) {
        setFollowUser(true)
        obtenerPosts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const noSeguirUsuario = async (nick_usuarioA, nick_usuarioB) => {
    try {
      var todayDate = new Date().toISOString().slice(0, 10)
      const body = {
        nick_usuarioA: nick_usuarioA,
        nick_usuarioB: nick_usuarioB,
        createdAt: todayDate,
        updatedAt: todayDate
      }
      const response = await noSeguirUsuarioPorNick(body)
      if (response.status === 200) {
        setFollowUser(false)
        obtenerPosts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!statePosts) {
    obtenerPosts()
  }

  useEffect(() => {
    // console.log(userProfile)
  }, [userProfile])

  return (
    <Container>
      <Sidebar />
      <Row className='header-profile py-5'>
        <Col sm={4} md={5} lg={5} xl={5} xxl={5} className='m-auto text-center'>
          <img
            src={
              userProfile.perfil_usuario
                ? require(`../../profiles/${userProfile.perfil_usuario}`)
                : Default
            }
            height='150'
            width='150'
            className='rounded-circle'
          />
        </Col>
        <Col sm={8} md={7} lg={7} xl={7} xxl={6}>
          <div className='description-profile'>
            <Row>
              <Col sm={4} md={4} lg={3} xl={3} xxl={4}>
                <h1>@{userProfile.nick_usuario}</h1>
              </Col>
              {datta.nick_usuario !== userProfile.nick_usuario && (
                <Col sm={4} md={4} lg={3} xl={3} xxl={4}>
                  {!followUser && (
                    <Button
                      variant='primary'
                      onClick={() =>
                        seguirUsuario(
                          datta.nick_usuario,
                          userProfile.nick_usuario
                        )
                      }
                    >
                      Follow
                    </Button>
                  )}
                  {followUser && (
                    <Button
                      variant='primary'
                      onClick={() =>
                        noSeguirUsuario(
                          datta.nick_usuario,
                          userProfile.nick_usuario
                        )
                      }
                    >
                      Unfollow
                    </Button>
                  )}
                </Col>
              )}
            </Row>
            <Row className='stats-profile'>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
                <p>
                  <b>{posts.length}</b> posts
                </p>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
                <p onClick={handleShowFollows}>
                  <b>{follows.length}</b> followers
                </p>

                <Modal show={showFollows} onHide={handleCloseFollows}>
                  <Modal.Header closeButton>
                    <Modal.Title>Followers</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {follows.map((follow, index) => (
                      <p key={index}>{follow.nick_usuario_follower}</p>
                    ))}
                  </Modal.Body>
                </Modal>
              </Col>
              <Col sm={4} md={4} lg={3} xl={2} xxl={2} className='stat'>
                <p onClick={handleShowFollowings}>
                  <b>{followings.length}</b> followings
                </p>
                <Modal show={showFollowings} onHide={handleCloseFollowings}>
                  <Modal.Header closeButton>
                    <Modal.Title>Followings</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {followings.map((follow, index) => (
                      <p key={index}>{follow.nick_usuario_following}</p>
                    ))}
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>
            <h3>{userProfile.nombre_usuario}</h3>
            {/* <p className='description'>22 anios Dev Frontend Ing en Sistemas</p> */}
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
