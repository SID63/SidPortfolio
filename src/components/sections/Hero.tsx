import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import SocialLinks from '../ui/SocialLinks';
import Canvas3D from '../canvas/Canvas3D';
import React from 'react';

interface HeroCardProps {
  title: string;
  description: string;
  delay?: number;
}

function HeroCard({ title, description, delay = 0 }: HeroCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative w-64 p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm
                 border border-purple-500/20 shadow-xl transform transition-all duration-300 hover:scale-105"
      style={{
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(138, 43, 226, 0.3)' 
          : '0 10px 30px rgba(138, 43, 226, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        {title}
      </h3>
      <p className="text-gray-300 text-sm">
        {description}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas3D />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Sidarth Murali
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Building immersive digital experiences with modern web technologies
          and creative coding.
        </p>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <SocialLinks size={28} />
          </motion.div>
          
          <motion.a
            href="#projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="inline-block animate-bounce"
          >
            <ArrowDown className="text-gray-400 hover:text-purple-400 transition-colors" size={32} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}