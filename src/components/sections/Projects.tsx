import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import React from 'react';

const projects = [
  {
    title: "Gojiraa Bot",
    description: "A powerful Discord bot featuring music playback, moderation tools, and interactive commands. Built with Discord.js and Node.js.",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80",
    link: "https://top.gg/bot/766196780295389204",
    githubLink: "https://github.com/username/project",
    tags: ["Discord.js", "Node.js", "Bot Development", "API Integration"]
  },
  {
    title: "Gesture Volume Control",
    description: "Computer vision application that allows users to control system volume through hand gestures. Implemented using Python and OpenCV.",
    image: "https://images.unsplash.com/photo-1599410292944-4ef5fac7de89?auto=format&fit=crop&q=80",
    link: "https://github.com/SID63/gesture-vol-control",
    githubLink: "https://github.com/username/project",
    tags: ["Python", "Computer Vision", "OpenCV", "Machine Learning"]
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with React, Three.js, and Framer Motion. Features 3D animations and responsive design.",
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/username/project",
    tags: ["React", "Three.js", "TypeScript", "Tailwind CSS"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">My Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of my work showcasing my skills in web development, bot creation, and computer vision.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}