import axios from 'axios'
const urlGeneral = 'http://localhost:8000/.netlify/functions/api/'

const header = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export const registrarUsuario = data => {
  const url = urlGeneral + 'crearUsuario'
  return axios.post(url, data, header)
}

export const validarUsuario = data => {
  const url = urlGeneral + 'validarUsuario'
  return axios.post(url, data)
}

export const crearPost = async data => {
  const url = urlGeneral + 'crearPost'
  return axios.post(url, data, header)
}

export const buscarPorNick = async usuarioABuscar => {
  const url = urlGeneral + 'findByNickname/' + usuarioABuscar
  return axios.get(url)
}
