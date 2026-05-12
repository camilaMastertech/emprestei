import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PublicLoanPage } from './pages/PublicLoanPage'
import { LeadershipLabPage } from './pages/LeadershipLabPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ai-native-leadership-lab" element={<LeadershipLabPage />} />
      <Route path="/l/:slug" element={<PublicLoanPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
