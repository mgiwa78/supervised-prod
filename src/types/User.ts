import Department from './Department'
import Role from './Role'

type User = {
  _id: string
  email: string
  firstName: string
  department: Department
  createdAt: string
  password?: string
  lastName: string
  roles: Array<Role>
  rolesState: any
}
export type UserEdit = {
  _id: string
  email: string
  firstName: string
  department: string
  createdAt: string
  password?: string
  lastName: string
  roles: Array<Role>
  rolesState: any
}

export default User
