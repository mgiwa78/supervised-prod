import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import User from '../../../types/User'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../../redux/selectors/auth'
import get from '../../../lib/get'

type Props = {
  doc: string

  handleClose: Function
}

const AssignDocument = ({handleClose, doc}: Props) => {
  const [supervisors, setSupervisors] = useState<Array<User>>([])
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const {token} = useSelector(selectAuth)

  const getSupervisors = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const RESPONSE = await get('documents', token)
        setSupervisors(RESPONSE.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setSupervisors([])
      console.log(error)
    }
  }
  useEffect(() => {
    getSupervisors()
  }, [])

  const handleModalUpdate = () => {
    document.body.classList.add('modal-open')
    document.body.classList.remove('modal-open')
    handleClose()
  }
  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='fw-bolder'> Assign document </h2>

              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => handleModalUpdate()}
                style={{cursor: 'pointer'}}
              >
                <KTIcon iconName='cross' className='fs-1' />
              </div>
            </div>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <button
                type='submit'
                className='btn btn-primary'
                data-kt-users-modal-action='submit'
                // disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
              >
                <span className='indicator-label'>Submit</span>
                {/* {(formik.isSubmitting || isUserLoading) && (
            <span className='indicator-progress'>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )} */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default AssignDocument
