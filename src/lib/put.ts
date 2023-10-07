import axios, {AxiosError} from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const put = async (
  path: string,
  data: Object,
  authToken: string | null,
  isPrompt: boolean = true,
  promt: string | null
) => {
  try {
    const RESPONSE = await axios.put(process.env.REACT_APP_API_URL + path, data, {
      headers: {
        _method: 'put',
        Authorization: 'Bearer ' + authToken,
      },
    })

    if (RESPONSE) {
      isPrompt &&
        MySwal.fire({
          text: `${promt}`,
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Ok!',
          heightAuto: false,
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        }).then(() => {})
    }
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

export default put
