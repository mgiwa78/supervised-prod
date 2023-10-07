/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../redux/store'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>{' '}
      {currentUser?.roles.some((role) => role.name === 'Superadmin') ? (
        <SidebarMenuItemWithSub to='/users' title='Users' fontIcon='bi-people' icon='profile-user'>
          <>
            <SidebarMenuItem to='/users/all' title='All' hasBullet={true} />
            <SidebarMenuItem to='/users/roles' title='Roles' hasBullet={true} />
            <SidebarMenuItem to='/users/permissions' title='Permissions' hasBullet={true} />
          </>
        </SidebarMenuItemWithSub>
      ) : (
        ''
      )}
    </>
  )
}

export {SidebarMenuMain}
