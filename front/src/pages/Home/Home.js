import { useState } from 'react'
//api
import { obtenerPostDeUsuariosQueSigo } from '../../api/posts'
//component(s)
import Post from '../../components/Post/Post'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//media(s)
import Profile from '../../assets/profile.jpg'
import Sad from '../../assets/sad.png'
//style
import './Home.css'

const Home = () => {
  const datta = JSON.parse(localStorage.getItem('userLogged'))

  const [posts, setPosts] = useState([])
  const [statePosts, setStatePosts] = useState(false)

  const handleCharge = async () => {
    const response = await obtenerPostDeUsuariosQueSigo(datta.nick_usuario)

    if (response.status === 200) {
      setPosts(response.data)
      setStatePosts(true)
      console.log(response.data)
    }
  }

  if (!statePosts) {
    handleCharge()
  }
  return (
    <div className='Home'>
      <Row>
        <Col xxl={2}>
          <Sidebar />
        </Col>
        <Col
          xxl={7}
          className={
            posts.length === 0
              ? 'posts d-flex flex-column justify-content-center align-items-center'
              : 'posts d-flex flex-column justify-content-center align-items-start'
          }
        >
          {posts.length !== 0 &&
            posts.map((post, index) => <Post post={post} key={index} />)}
          {posts.length === 0 && (
            <div className='text-center'>
              <img src={Sad} height='50' />
              <p className='text-center py-2'>No posts to show</p>
            </div>
          )}
        </Col>
        <Col xxl={3} className='text-center'>
          <div className='profile-suggestions'>
            <div className='my-profile'>
              <img src={Profile} height='70' style={{ borderRadius: '50px' }} alt='profile' />
              <div className='data-profile'>
                <h2>my nickname</h2>
                <p>my name</p>
              </div>
            </div>
            <div className='suggestions'>
              <div className='profile-suggest'>
                <img
                  src={Profile}
                  height='70'
                  style={{ borderRadius: '50px' }}
                  alt='profile'
                />
                <div className='data-profile'>
                  <h3>my nickname</h3>
                  <p>my name</p>
                </div>
              </div>
              <div className='profile-suggest'>
                <img
                  src={Profile}
                  height='70'
                  style={{ borderRadius: '50px' }}
                  alt='profile'
                />
                <div className='data-profile'>
                  <h3>my nickname</h3>
                  <p>my name</p>
                </div>
              </div>
              <div className='profile-suggest'>
                <img
                  src={Profile}
                  height='70'
                  style={{ borderRadius: '50px' }}
                  alt='profile'
                />
                <div className='data-profile'>
                  <h3>my nickname</h3>
                  <p>my name</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
