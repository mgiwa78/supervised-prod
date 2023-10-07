/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  MixedWidget9,
} from '../../_metronic/partials/widgets'
import {UserAnalytics} from './components/UserAnalytics'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import Role from '../../types/Role'
import get from '../../lib/get'

type RolesData = {
  role: Role
  countUsers: number
}

const Dashboard: FC = () => {
  const [roles, setRoles] = useState<Array<RolesData>>([])
  const {token} = useSelector(selectAuth)

  const getRoles = async () => {
    try {
      if (token) {
        const RESPONSE = await get('roles/withUsers', token)
        setRoles(RESPONSE.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <>
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <UserAnalytics
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
            data={roles}
          />
        </div>
      </div>
    </>
  )
}

const AdminDashboard: FC = () => {
  const adminDahboard: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Admin Dahboard',
      path: '/dashboard',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <PageTitle breadcrumbs={adminDahboard}>Admin Dahboard</PageTitle>
      <Dashboard />
    </>
  )
}

export {AdminDashboard}
