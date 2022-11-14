import Profile from '../../assets/profile.jpg'
import PostImage from '../../assets/eiffel.jpg'

import { Link } from 'react-router-dom'
import "./Post.css"
const Post = ({ post }) => {
    return (
        <div className="post">
            <div className='head-post'>
                <div className='data-poster p-2'>
                    <img src={Profile} className="profile" />
                    <p className='mx-2'>Johny Foons</p>
                </div>
                <div className='actions-post'></div>
            </div>
            <div className='body-post'>
                <img src={PostImage} className="image-post" />
            </div>
            <div className='footer-post p-2'>
                <b><p>Johny Foons</p></b>
                {/* <Link to={`/users/${id}`}>
                    <b><p>Johny Foons</p></b>
                </Link> */}

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            </div>
            {/* <h3>{post.titulo_post}</h3> */}

        </div>
    )
}

export default Post;