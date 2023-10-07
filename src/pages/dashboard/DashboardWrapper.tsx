/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {PageTitle} from '../../_metronic/layout/core'
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
} from '../../_metronic/partials/widgets'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import {AdminDashboard} from '../../modules/dashboard/AdminDashboard'

const DashboardPage: FC = () => {
  const auth = useSelector(selectAuth)
  console.log(auth.user?.roles.some((role) => role.name === 'Superadmin'))
  return (
    <>{auth.user?.roles.some((role) => role.name === 'Superadmin') ? <AdminDashboard /> : ''}</>
  )
}
const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
