/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
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
} from '../../_metronic/partials/widgets'

const Dashboard: FC = () => <></>

const InstructorDashboard: FC = () => {
  const InstrubtorDahboardb: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Instrubtor Dahboard',
      path: '/dashboard',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <PageTitle breadcrumbs={InstrubtorDahboardb}>Instrubtor Dahboard</PageTitle>
      <Dashboard />
    </>
  )
}

export {InstructorDashboard}
