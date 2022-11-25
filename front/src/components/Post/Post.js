import Profile from '../../assets/profile.jpg'
import PostImage from '../../assets/eiffel.jpg'

import { Link } from 'react-router-dom'
import "./Post.css"
const Post = ({ post }) => {
    

    return (
        <div className="post">
            <div className='head-post'>
                <div className='data-poster p-2'>
                    <img src={require(`../../posts/${post.imagen_post}`)} className="profile" />
                    <p className='mx-2'>{post.nick}</p>
                </div>
                <div className='actions-post'></div>
            </div>
            <div className='body-post'>
                <img src={require(`../../posts/${post.imagen_post}`)} className="image-post" />
            </div>
            <div className='footer-post p-2'>
                <b><p>{post.nick}</p></b>
                {/* <Link to={`/users/${id}`}>
                    <b><p>Johny Foons</p></b>
                </Link> */}

                <p>{post.descripcion_post}</p>
            </div>
            {/* <h3>{post.titulo_post}</h3> */}

        </div>
    )
}

export default Post;