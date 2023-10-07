import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const get = async (path: string, authToken = '') => {
  try {
    const RESPONSE = await axios.get(process.env.REACT_APP_API_URL + path, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })

    return RESPONSE.data
  } catch (error: any) {
    console.log(error.response.status === 403)

    if (error.response.status === 401) {
      MySwal.fire({
        text: 'Unauthorised',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.status === 403) {
      MySwal.fire({
        text: 'Permission Denied',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.status === 500) {
      MySwal.fire({
        text: 'Internal server error',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
  }
}

export default get
