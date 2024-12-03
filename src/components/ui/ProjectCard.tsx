import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  githubLink?: string;
  tags: string[];
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  link, 
  githubLink,
  tags 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = 
      `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-purple-900/30
                 transition-all duration-300 ease-out transform-gpu"
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-700
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent 
                      opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 
                       transition-colors duration-300">
            {title}
          </h3>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github size={20} />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none 
                    transition-all duration-300">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-purple-900/30 text-purple-200 rounded-full
                       backdrop-blur-sm border border-purple-500/20 transform transition-all
                       duration-300 hover:scale-105 hover:bg-purple-800/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 
                    group-hover:from-purple-600/10 group-hover:to-blue-600/10 
                    transition-all duration-700 pointer-events-none" />
    </motion.div>
  );
}