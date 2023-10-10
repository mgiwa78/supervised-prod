import {Route, Routes, Navigate} from 'react-router-dom'
import CreateDocuments from '../../modules/documents/createdocuments'

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path='/users'>
        <Route index element={<Navigate to='/users/all' />} />
        <Route path='all' element={<CreateDocuments />} />
      </Route>
    </Routes>
  )
}

export {StudentRoutes}
