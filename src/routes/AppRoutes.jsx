
import { Navigate, Route, Routes } from 'react-router'
import MainLayout from '../components/layout/MainLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import Question from '../pages/Questions/Question'
import MachineCoding from '../pages/Machine/MachineCoding'

const AppRoutes = () => {
  return (
    <Routes>
          <Route element={<MainLayout/> }>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/questions" element={<Question />} />
               <Route path="/machine-coding" element={<MachineCoding />} />
          </Route>

          <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  )
}

export default AppRoutes
