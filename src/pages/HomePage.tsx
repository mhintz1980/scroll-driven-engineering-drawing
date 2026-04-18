import { Hero } from '../components/sections/Hero';
import { EngineeringReel } from '../components/sections/EngineeringReel';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Services } from '../components/sections/Services';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <EngineeringReel />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
