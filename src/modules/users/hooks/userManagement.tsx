import {useReducer} from 'react'
import post from '../../../lib/post'
import {useSelector} from 'react-redux'
import {Console} from 'console'
import put from '../../../lib/put'
import get from '../../../lib/get'

// const initialState = {
//   user: {
//     avatar: 'avatars/300-6.jpg',
//     position: 'Art Director',
//     role: 'Administrator',
//     name: '',
//     email: '',
//   },
//   users: [],
//   isLoading: false,
//   itemIdForUpdate: undefined,
// }

const allRoles = [{name: 'Superadmin'}, {name: 'Student'}, {name: 'Supervisor'}]

function createInitialState() {
  const initialState = {
    user: {
      avatar: 'avatars/300-6.jpg',
      position: 'Art Director',
      role: 'Administrator',
      name: '',
      email: '',
    },
    allRoles: [{name: 'Superadmin'}, {name: 'Student'}, {name: 'Supervisor'}],
    users: [],
    isLoading: false,
    itemIdForUpdate: undefined,
  }
  return {
    ...initialState,
  }
}

// Define your reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SetItemIdForUpdate':
      return {...state, itemIdForUpdate: action.payload}
    case 'CreateUser':
      return {...state, itemIdForUpdate: action.payload}
    case 'getUserById':
      return {...state, user: action.payload}
    case 'getUsers':
      return {...state, users: action.payload}
    case 'UpdateLoading':
      return {...state, isLoading: action.payload}
    case 'UpdateError':
      return {...state, error: action.payload}
    case 'SetLoading':
      return {...state, error: action.payload}
    case 'selectUser':
      const rolesStatus = {}
      if (action.payload) {
        allRoles.map((r) => {
          return (rolesStatus[r.name] = action.payload.roles.some((e) => e.name === r.name))
        })
      }
      return {
        ...state,
        user: {
          ...action.payload,
          ...rolesStatus,
        },
      }
    case 'RemoveUser':
      return {...state, user: undefined}
    default:
      throw new Error('Unsupported action type')
  }
}

const useUserManagement = () => {
  const [state, dispatch] = useReducer(reducer, createInitialState)

  const isLoading = false
  const RemoveUser = () => dispatch({type: 'RemoveUser'})

  const createUser = async (newUserData, token) => {
    const RESPONSE = await post(`users`, newUserData, token, true, 'User Updated')

    // dispatch({type: 'CreateUser', payload: values})
  }

  const getUserById = (id) => dispatch({type: 'getUserById', payload: id})

  const selectUser = async (userData) => {
    dispatch({type: 'selectUser', payload: userData})
  }
  const getUsers = async (token: string) => {
    if (token) {
      const RESPONSE = await get('users', token)
      dispatch({type: 'UpdateLoading', payload: true})
      // const RESPONSE2 = await get('roles', token)
      if (RESPONSE) {
        dispatch({type: 'UpdateLoading', payload: false})
        return dispatch({type: 'getUsers', payload: RESPONSE.data})
      }

      // setUsers(RESPONSE.data)
      // setRoles(RESPONSE2.data)
    }
  }
  const updateUser = async (newUserData, token) => {
    // UpdateLoading(true)
    const RESPONSE = await put(`users/${newUserData._id}`, newUserData, token, true, 'User Updated')
    // UpdateLoading(false)
    // dispatch({type: 'UpdateUser', payload: newUserData})
  }

  const setItemIdForUpdate = (id) => {
    return dispatch({type: 'SetItemIdForUpdate', payload: id})
  }

  return {
    createUser,
    RemoveUser,
    updateUser,
    selectUser,
    setItemIdForUpdate,
    getUserById,
    getUsers,
    users: state.users,
    isLoading: state.isLoading,
    user: state.user,
    error: state.error,
    allRoles: state.allRoles,
    itemIdForUpdate: state.itemIdForUpdate,
  }
}

export default useUserManagement
