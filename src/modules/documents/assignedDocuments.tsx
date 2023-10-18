import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import {KTIcon} from '../../_metronic/helpers'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import User from '../../types/User'
import FormatDate from '../../utils/FormatDate'
import TDocument from '../../types/Document'
import {Spinner} from '../../components/Spinner'
import {Link, useNavigate} from 'react-router-dom'
import {selectAuth} from '../../redux/selectors/auth'
import AssignDocument from '../users/components/assignDocument'
import DocumentTable from '../../components/documentTable'

const documentsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Documents',
    path: '/documents/assigned',
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

const AssignedDocument = () => {
  const {token} = useSelector(selectAuth)
  const [documents, setDocuments] = useState<Array<TDocument>>([])
  const [doc, assginDoc] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleClose = () => {
    assginDoc(null)
  }

  const getDocuments = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const RESPONSE = await get('documents/assigned', token)
        setDocuments(RESPONSE.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setDocuments([])
      console.log(error)
    }
  }

  useEffect(() => {
    getDocuments()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={documentsBreadcrumbs}>All Assigned Documents </PageTitle>
      <DocumentTable
        title='Assigned Documents'
        documents={documents}
        assginDoc={assginDoc}
        isLoading={isLoading}
      />
      {doc && <AssignDocument doc={doc} handleClose={handleClose} />}
    </>
  )
}

export default AssignedDocument
