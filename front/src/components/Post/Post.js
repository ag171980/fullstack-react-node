import { useState, useEffect } from 'react'

import Profile from '../../assets/profile.jpg'
import PostImage from '../../assets/eiffel.jpg'

import { Link } from 'react-router-dom'

import { obtenerDataPorId } from '../../api/users'
//style
import './Post.css'
const Post = ({ post }) => {
  const [loadData, setLoadData] = useState(false)
  const [userDataPost, setUserDataPost] = useState()

  const obtenerDataUsuario = async idUsuario => {
    const response = await obtenerDataPorId(idUsuario)
    if (response.status === 200) {
      setUserDataPost(response.data)
      setLoadData(true)
    }
  }

  if (!loadData) {
    obtenerDataUsuario(post.id_user)
  }
  useEffect(() => {
  }, [userDataPost])

  return (
    <div className='post'>
      <div className='head-post'>
        <div className='data-poster p-2'>
          {userDataPost !== undefined && (
            <img
              src={require(`../../profiles/${userDataPost.perfil_usuario}`)}
              className='profile'
            />
          )}
          <p className='mx-2'>{post.nick_usuario}</p>
        </div>
        <div className='actions-post'></div>
      </div>
      <div className='body-post'>
        <img
          src={require(`../../posts/${post.imagen_post}`)}
          className='image-post'
        />
      </div>
      <div className='footer-post p-2'>
        <b>
          <p>{post.nick_usuario}</p>
        </b>
        {/* <Link to={`/users/${id}`}>
                    <b><p>Johny Foons</p></b>
                </Link> */}

        <p>{post.descripcion_post}</p>
      </div>
      {/* <h3>{post.titulo_post}</h3> */}
    </div>
  )
}

export default Post
