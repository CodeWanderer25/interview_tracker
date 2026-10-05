
import { Navigate, Route, Routes } from 'react-router'
import MainLayout from '../components/layout/MainLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import Question from '../pages/Questions/Question'

const AppRoutes = () => {
  return (
    <Routes>
          <Route element={<MainLayout/> }>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/questions" element={<Question />} />
          </Route>

          <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  )
}

export default AppRoutes
