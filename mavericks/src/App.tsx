import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Learn from "./pages/learn";
import ModelPerformanceTracking from "./pages/ModelDashboard";
import ResearcherPage from "./pages/ResearcherPage";
import { ModelProvider } from "./components/ModelContext";

function App() {

  return (
    <Router>
      
      <Navbar />
      <ModelProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/model" element={<ModelPerformanceTracking />} />
          <Route path="/researcher" element={<ResearcherPage />} />
        </Routes>
      </ModelProvider>
    </Router>
  );
};

export default App;
