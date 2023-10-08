import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import {KTIcon} from '../../_metronic/helpers'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import User from '../../types/User'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import useUserManagement from './hooks/userManagement'
import Role from '../../types/Role'
import {selectAuth} from '../../redux/selectors/auth'
import CreateRole from './components/createrole'
import EditRole from './components/editrole'

const rolesBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/users/roles',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Roles',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

type RolesData = {
  role: Role
  countUsers: number
}
const Roles = () => {
  const [showEditRole, setShowEditRole] = useState<boolean>(false)
  const [showCreateRole, setShowCreateRole] = useState<boolean>(false)
  const [editRole, setEditRole] = useState<Role>()

  const {token} = useSelector(selectAuth)
  const [roles, setRoles] = useState<Array<RolesData> | null>(null)

  const setHideEditRole = async () => {
    setShowEditRole(false)
    setEditRole(undefined)
  }
  const getRoles = async () => {
    try {
      if (token) {
        const RESPONSE = await get('roles/withUsers', token)
        setRoles(RESPONSE.data)
      }
    } catch (error) {
      setRoles([])
      console.log(error)
    }
  }

  useEffect(() => {
    getRoles()
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={rolesBreadcrumbs}>Roles list</PageTitle>
      <div className='row'>
        {roles ? (
          roles.map((role) => (
            <div className='col-md-4 mb-10' key={role.role._id}>
              <div className='card card-flush h-md-100'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>{role.role.name}</h2>
                  </div>
                </div>
                <div className='card-body pt-1'>
                  <div className='fw-bold text-gray-600 mb-5'>
                    Total users with this role: {role.countUsers}
                  </div>
                  <div className='d-flex flex-column text-gray-600'>
                    {role.role.permissions.map((perms) => (
                      <div
                        key={perms._id + role.role._id}
                        className='d-flex align-items-center py-2'
                      >
                        <span className='bullet bg-primary me-3'></span>
                        {perms.action}
                      </div>
                    ))}
                    {/* 
                <div className='d-flex align-items-center py-2'>
                  <span className='bullet bg-primary me-3'></span>
                  <em>and 7 more...</em>
                </div> */}
                  </div>
                </div>
                <div className='card-footer flex-wrap pt-0'>
                  {/* <a
                  href='../../demo1/dist/apps/user-management/roles/view.html'
                  className='btn btn-light btn-active-primary my-1 me-2'
                >
                  View Role
                </a> */}
                  <button
                    type='button'
                    className='btn btn-light btn-active-light-primary my-1'
                    onClick={() => {
                      setEditRole(role.role)
                      setShowEditRole(true)
                    }}
                  >
                    Edit Role
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='fv-row d-flex justify-content-center mh-300px'>
            <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
          </div>
        )}
        <div className='col-md-4'>
          <div className='card h-md-100'>
            <div className='card-body d-flex flex-center'>
              <button
                type='button'
                className='btn btn-clear d-flex flex-column flex-center'
                onClick={() => setShowCreateRole(true)}
              >
                <img
                  src='/assets/media/illustrations/sketchy-1/4.png'
                  alt=''
                  className='mw-100 mh-150px mb-7'
                />
                <div className='fw-bold fs-3 text-gray-600 text-hover-primary'>Add New Role</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {editRole ? (
        <EditRole show={showEditRole} editRole={editRole} handleClose={() => setHideEditRole()} />
      ) : (
        <CreateRole show={showCreateRole} handleClose={() => setShowCreateRole(false)} />
      )}
    </>
  )
}

export default Roles
