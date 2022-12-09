import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

import Post from './components/Post/Post'

import RouterPage from './router/RouterPage';
function App() {
  

  
  // const [blogs, setBlogs] = useState([]);
  // const [stateBlogs, setStateBlogs] = useState(false);

  // const getBlogs = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/blogs")
  //     if (response.status === 200) {
  //       setBlogs([])
  //       console.log(response.data)
  //       setStateBlogs(true)
  //       response.data.forEach(element => {
  //         setBlogs(blogs => [...blogs, element])
  //       });
  //       return true;
  //     }
  //     return false;
  //   } catch (err) {
  //     console.error(err)
  //     return false;
  //   }
  // }


  // const sendBlogs = async (data) => {
  //   const resp = await axios.post("http://localhost:8000/createBlog", data)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }
  // const subirPost = (e) => {
  //   e.preventDefault();
  //   var todayDate = new Date().toISOString().slice(0, 10);
  //   let data = {
  //     title: document.querySelector("#title").value,
  //     content: document.querySelector("#content").value,
  //     createdAt: todayDate,
  //     updatedAt: todayDate
  //   }

  //   sendBlogs(data)
  // }
  // if (!stateBlogs) {
  //   getBlogs()
  // }
  // const mostrarBlogs = async () => {
  //   await getBlogs()


  // }

  // useEffect(() => {
  // }, [stateBlogs])

  return (
    <div style={{background:"#ebf7ff"}}>
      <RouterPage />
    </div>
  );
}

export default App;
