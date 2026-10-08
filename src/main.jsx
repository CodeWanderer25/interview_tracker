
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router'
import { ProjectProvider } from './context/ProjectContext.jsx'

createRoot(document.getElementById('root')).render(
  <ProjectProvider>
  <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
  </ProjectProvider>

   
)
