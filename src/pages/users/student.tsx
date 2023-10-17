import React from 'react'
import Users from '../../modules/users/users'
import {PageLink, PageTitle} from '../../_metronic/layout/core'

type Props = {}
const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/users/all',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const AllSupervisors = (props: Props) => {
  const role = 'Supervisors'
  return (
    <div>
      <PageTitle breadcrumbs={usersBreadcrumbs}>{role} list</PageTitle>
      <Users role={role} />
    </div>
  )
}

export default AllSupervisors
