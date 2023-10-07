import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import {WithChildren} from '../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {StudentRoutes} from './sub-routes/StudentsRoutes'
import Users from '../modules/users/users'
import Roles from '../modules/users/roles'
import Permissions from '../modules/users/permissions'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />

        {/*  */}
        {/*  */}
        {/* Asset based routes */}
        {/* Asset based routes */}
        {/*  */}
        {/*  */}

        <Route path='/users'>
          <Route index element={<Navigate to='/users/all' />} />
          <Route path='all' element={<Users />} />
          <Route path='roles' element={<Roles />} />
          <Route path='permissions' element={<Permissions />} />
        </Route>

        <Route path='student' element={<StudentRoutes />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
