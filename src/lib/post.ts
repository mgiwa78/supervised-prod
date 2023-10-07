import axios, {AxiosError} from 'axios'
// import {process.env.REACT_APP_API_URL} from '__CONSTANTS__/index'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(swal.default)

const post = async (
  path: string,
  data: Object,
  authToken: string | null = null,
  isPrompt: boolean = false,
  propt: string = ''
) => {
  try {
    const RESPONSE = await axios.post(process.env.REACT_APP_API_URL + path, data, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })

    isPrompt &&
      MySwal.fire({
        text: 'Created Successfully',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    return RESPONSE.data
  } catch (error: any) {
    if (error.response?.data.errors) {
      MySwal.fire({
        icon: 'error',
        html:
          '<div class="text-left align-left">' +
          error.response.data.errors.map(
            (e: any) => `<b class="text-capitalize"> ${e.field} </b>: ${e.message}<br>`
          ) +
          '</div>',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.data.error) {
      MySwal.fire({
        text: error.response.data.error,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
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
    } else {
      MySwal.fire({
        text: error.message,
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

export default post
