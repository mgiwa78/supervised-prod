import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import Permission from '../../types/Permission'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import get from '../../lib/get'
import Role from '../../types/Role'
import FormatDate from '../../utils/FormatDate'

const Permissions = () => {
  const permissionsBreadcrumbs: Array<PageLink> = [
    {
      title: 'User Management',
      path: '/users/permissions',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Permissions',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  type PermissionsWithRole = {permission: Permission; roles: Array<Role>}
  const [permissions, setPermissions] = useState<Array<PermissionsWithRole>>([])
  const {token} = useSelector(selectAuth)

  const getPermissions = async () => {
    try {
      if (token) {
        const RESPONSE = await get('permissions/withUsers', token)
        setPermissions(RESPONSE.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={permissionsBreadcrumbs}>Permissions list</PageTitle>
      <div>
        <div className='card card-flush'>
          {/* <div className='card-header mt-6'>
            <div className='card-title'>
              <div className='d-flex align-items-center position-relative my-1 me-5'>
                <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-5'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <input
                  type='text'
                  data-kt-permissions-table-filter='search'
                  className='form-control form-control-solid w-250px ps-13'
                  placeholder='Search Permissions'
                />
              </div>
            </div> */}
          {/* <div className='card-toolbar'>
              <button
                type='button'
                className='btn btn-light-primary'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_add_permission'
              >
                <i className='ki-duotone ki-plus-square fs-3'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                  <span className='path3'></span>
                </i>
                Add Permission
              </button>
            </div> 
          </div>*/}
          <div className='card-body pt-0'>
            <div
              id='kt_permissions_table_wrapper'
              className='dataTables_wrapper dt-bootstrap4 no-footer'
            >
              <div className='table-responsive'>
                <table
                  className='table align-middle table-row-dashed fs-6 gy-5 mb-0 dataTable no-footer'
                  id='kt_permissions_table'
                >
                  <thead>
                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                      <th
                        className='min-w-125px sorting'
                        tabIndex={0}
                        aria-controls='kt_permissions_table'
                        rowSpan={1}
                        colSpan={1}
                        aria-label='Name: activate to sort column ascending'
                        style={{width: '231.65px'}}
                      >
                        Name
                      </th>
                      <th
                        className='min-w-250px sorting_disabled'
                        rowSpan={1}
                        colSpan={1}
                        aria-label='Assigned to'
                        style={{width: '507.538px'}}
                      >
                        Assigned to
                      </th>
                      <th
                        className='min-w-125px sorting'
                        tabIndex={0}
                        aria-controls='kt_permissions_table'
                        rowSpan={1}
                        colSpan={1}
                        aria-label='Created Date: activate to sort column ascending'
                        style={{width: '218.938px'}}
                      >
                        Created Date
                      </th>
                      <th
                        className='text-start min-w-100px sorting_disabled'
                        rowSpan={1}
                        colSpan={1}
                        aria-label='Actions'
                        style={{width: '136.975px'}}
                      >
                        Asset
                      </th>
                    </tr>
                  </thead>
                  <tbody className='fw-semibold text-gray-600'>
                    {permissions.map((perm) => (
                      <tr key={perm.permission._id} className='odd'>
                        <td>{perm.permission.action}</td>
                        <td>
                          {perm.roles.map((role) => (
                            <span key={role._id} className='badge badge-light-primary fs-7 m-1'>
                              {role.name}
                            </span>
                          ))}
                        </td>
                        <td data-order={perm.permission.createdAt}>
                          {FormatDate(perm.permission.createdAt)}
                        </td>
                        <td>{perm.permission.asset}</td>
                        {/* <td className='text-end'>
                          <button
                            className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_permission'
                          >
                            <i className='ki-duotone ki-setting-3 fs-3'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                              <span className='path4'></span>
                              <span className='path5'></span>
                            </i>
                          </button>
                          <button
                            className='btn btn-icon btn-active-light-primary w-30px h-30px'
                            data-kt-permissions-table-filter='delete_row'
                          >
                            <i className='ki-duotone ki-trash fs-3'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                              <span className='path4'></span>
                              <span className='path5'></span>
                            </i>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                  <div className='dataTables_length' id='kt_permissions_table_length'>
                    <label>
                      <select
                        name='kt_permissions_table_length'
                        aria-controls='kt_permissions_table'
                        className='form-select form-select-sm form-select-solid'
                      >
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                  <div
                    className='dataTables_paginate paging_simple_numbers'
                    id='kt_permissions_table_paginate'
                  >
                    <ul className='pagination'>
                      <li
                        className='paginate_button page-item previous disabled'
                        id='kt_permissions_table_previous'
                      >
                        <a
                          href='#'
                          aria-controls='kt_permissions_table'
                          data-dt-idx='0'
                          tabIndex={0}
                          className='page-link'
                        >
                          <i className='previous'></i>
                        </a>
                      </li>
                      <li className='paginate_button page-item active'>
                        <a
                          href='#'
                          aria-controls='kt_permissions_table'
                          data-dt-idx='1'
                          tabIndex={0}
                          className='page-link'
                        >
                          1
                        </a>
                      </li>
                      <li
                        className='paginate_button page-item next disabled'
                        id='kt_permissions_table_next'
                      >
                        <a
                          href='#'
                          aria-controls='kt_permissions_table'
                          data-dt-idx='2'
                          tabIndex={0}
                          className='page-link'
                        >
                          <i className='next'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Permissions
