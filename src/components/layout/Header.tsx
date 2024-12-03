import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-white font-bold text-xl flex items-center gap-2">
            <img src="/dp3.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <span>Sidarth Murali</span>
          </a>
          
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <li><a href="#home" className="text-white hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#projects" className="text-white hover:text-purple-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-white hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </nav>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}