import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import User from '../../../types/User'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../../redux/selectors/auth'
import get from '../../../lib/get'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import post from '../../../lib/post'
import clsx from 'clsx'
import TDocument from '../../../types/Document'

type Props = {
  doc: string

  handleClose: Function
}

const initialValues: {
  supervisor: string
  document: string
} = {supervisor: '', document: ''}

const loginSchema = Yup.object().shape({
  supervisor: Yup.string().required('Please select an supervisor'),
})

const AssignDocument = ({handleClose, doc}: Props) => {
  const [supervisors, setSupervisors] = useState<Array<User>>([])
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const {token} = useSelector(selectAuth)
  const [loading, setLoading] = useState(false)

  const getSupervisors = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const RESPONSE = await get('users', token)
        setSupervisors(RESPONSE.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setSupervisors([])
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        console.log(values)
        const RESPONSE: any = await post(
          `documents/assign-supervisor/${doc}`,
          {documentId: doc, ...values},
          token,
          true,
          'Supervisor assigned successfully'
        )

        console.log(RESPONSE)

        // dispatch(loginSuccess(RESPONSE))
        // navigate('/dashboard')
        setSubmitting(false)
        setLoading(false)
      } catch (error: any) {
        console.log(error)
        setSubmitting(false)
        setLoading(false)

        if (error.response?.data.message) {
          return setStatus(error.response.data.message)
        }
        if (error.response?.data.error) {
          return setStatus(error.response.data.error)
        } else {
          return setStatus(error.error)
        }
      }
    },
  })

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
            </div>{' '}
            <form className='form w-100 h-100' onSubmit={formik.handleSubmit} noValidate>
              <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                {formik.status ? (
                  <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>{formik.status}</div>
                  </div>
                ) : (
                  ''
                )}
                {supervisors.length > 0 &&
                  supervisors.map((supervisor) => {
                    return (
                      <label
                        key={supervisor._id}
                        className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'
                      >
                        <span className='d-flex align-items-center me-2'>
                          <span className='symbol symbol-50px me-6'>
                            <span className='symbol-label bg-light-primary'>
                              <div className='symbol symbol-50px me-5'>
                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
                              </div>
                            </span>
                          </span>

                          <span className='d-flex flex-column'>
                            <span className='fw-bolder fs-6'>
                              {supervisor.lastName}
                              {supervisor.firstName}
                            </span>
                            <span className='fs-7 text-muted'>{supervisor.department.name}</span>
                          </span>
                        </span>

                        <span className='form-check form-check-custom form-check-solid'>
                          <input
                            className='form-check-input'
                            type='radio'
                            onChange={() => (formik.values.supervisor = supervisor._id)}
                            name='supervisor'
                            value={supervisor._id}
                            // checked={data.appBasic.appType === 'Quick Online Courses'}
                            // onChange={() =>
                            //   updateData({
                            //     appBasic: {
                            //       appName: data.appBasic.appName,
                            //       appType: 'Quick Online Courses',
                            //     },
                            //   })
                            // }
                          />
                        </span>
                      </label>
                    )
                  })}
                {formik.touched.supervisor && formik.errors.supervisor && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.supervisor}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='modal-footer'>
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
              </div>{' '}
            </form>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default AssignDocument
