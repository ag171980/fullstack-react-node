import axios from 'axios'
const urlGeneral = 'http://localhost:8000/.netlify/functions/api/posts/'

export const obtenerPostDeUsuariosQueSigo = async nick => {
  const url = urlGeneral + 'showPostsFromUsersIFollow/' + nick
  return axios.get(url)
}

export const obtenerPostsPorNickname = async nick => {
  const url = urlGeneral + nick
  return axios.get(url)
}

export const obtenerNickPorId = async idPost => {
  const url = urlGeneral + idPost
  return axios.get(url)
}
