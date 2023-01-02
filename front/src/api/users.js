import axios from 'axios'
const urlGeneral = 'http://localhost:8000/.netlify/functions/api/users/'

export const obtenerDataPorId = async idUsuario => {
  const url = urlGeneral + idUsuario
  return axios.get(url)
}

export const obtenerPostDeUsuariosQueSigo = async nick => {
  const url = urlGeneral + 'showPostsFromUsersIFollow/' + nick
  return axios.get(url)
}

export const seguirUsuarioPorNick = async body => {
  const url = urlGeneral + 'followUserByNickname'
  return axios.post(url, body)
}

export const noSeguirUsuarioPorNick = async body => {
  const url = urlGeneral + 'unfollowUserByNickname'
  return axios.post(url, body)
}
