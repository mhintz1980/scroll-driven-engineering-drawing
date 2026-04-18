import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CadBackground } from './components/CadBackground';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { HomePage } from './pages/HomePage';
import { FeaturesPlaygroundPage } from './pages/FeaturesPlaygroundPage';

function App() {
  return (
    <Router basename="/Mark_Hintz-Portfolio-v2/">
      <CadBackground />
      <div className="fixed top-8 right-8 z-60">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden selection:bg-accent-primary/20 selection:text-accent-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/second-page" element={<FeaturesPlaygroundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
