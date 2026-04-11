import { Navbar } from './components/layout/Navbar';
import { CadBackground } from './components/CadBackground';
import { Hero } from './components/sections/Hero';
import { EngineeringReel } from './components/sections/EngineeringReel';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { ThemeToggle } from './components/ui/ThemeToggle';

function App() {
  return (
    <>
      <CadBackground />
      <div className="fixed top-8 right-8 z-[60]">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden selection:bg-accent-primary/20 selection:text-accent-primary">
        <Hero />
        <EngineeringReel />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

export default App;
