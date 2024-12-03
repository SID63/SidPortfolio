import { Github, Linkedin, Mail } from 'lucide-react';
import SkillList from '../ui/SkillList';
import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I'm a creative developer passionate about building immersive digital experiences. 
              With expertise in 3D graphics and web development, I create unique interactive solutions 
              that push the boundaries of web technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="hover:text-purple-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-purple-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@example.com" className="hover:text-purple-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Skills</h3>
            <SkillList />
          </div>
        </div>
      </div>
    </section>
  );
}