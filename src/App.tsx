import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CadBackground } from './components/CadBackground';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { HomePage } from './pages/HomePage';
import { FeaturesPlaygroundPage } from './pages/FeaturesPlaygroundPage';
import { DrawingPackagePage } from './components/drawing-package/DrawingPackagePage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Drawing Package variation — standalone, no shared shell */}
        <Route path="/drawing-package" element={<DrawingPackagePage />} />

        {/* Original site with shared shell */}
        <Route path="*" element={
          <>
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
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
