import ModelPerformanceTracking from './pages/ModelDashboard';
import ResearcherPage from './pages/ResearcherPage';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/modeldashboard" element={<ModelPerformanceTracking />} />
        <Route path="/researcher" element={<ResearcherPage />} />
      </Routes>
    </Router>
  )
}

export default App