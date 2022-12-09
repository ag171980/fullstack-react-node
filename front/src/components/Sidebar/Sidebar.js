import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { BiMessageAlt, BiLogOut, BiAddToQueue } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import './Sidebar.css'

export const Sidebar = () => {
  let datta = JSON.parse(localStorage.getItem('userLogged'))

  return (
    <div className='Sidebar'>
      <div className='logo'>
        {/* <img src={Logo} /> */}
        <h1>Meety</h1>
      </div>
      <div className='navigate-social'>
        <div className='link'>
          <AiOutlineHome />
          <Link to='/home'>Feed</Link>
        </div>
        <div className='link'>
          <AiOutlineSearch />
          <a>Search</a>
        </div>
        <div className='link'>
          <BiMessageAlt />
          <Link to='/messages'>Messages</Link>
        </div>
        <div className='link'>
          <FaUserFriends />
          <Link to='/friends'>Friends</Link>
        </div>
        <div className='link'>
          <CgProfile />
          <Link to={`/${datta.nick_usuario}`}>My Profile</Link>
        </div>
        <div className='link'>
          <BiLogOut />

          <a>Logout</a>
        </div>
        <div className='link'>
          <BiAddToQueue />
          <a>New Post</a>
        </div>
      </div>
    </div>
  )
}
