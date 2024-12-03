import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Canvas3D from './components/canvas/Canvas3D';


export default function App() {
  return (
    <div className="min-h-screen relative">
      <Canvas3D className="fixed inset-0 z-0 bg-blue-500/20" />
      <div className="relative z-10">
        <Header />
        <main>
          <section className="relative min-h-screen">
            <Hero />
          </section>
          <section className="relative min-h-screen">
            <About />
          </section>
          <section className="relative min-h-screen">
            <Projects />
          </section>
          <section className="relative min-h-screen">
            <Contact />
          </section>
        </main>
        <footer className="text-center py-6 text-gray-400">
          © {new Date().getFullYear()} Sidarth Murali
        </footer>
      </div>
    </div>
  );
}