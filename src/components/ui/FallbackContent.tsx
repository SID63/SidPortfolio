import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';

export default function FallbackContent() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-black to-purple-900 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white p-8"
      >
        <Monitor className="w-16 h-16 mx-auto mb-6 text-purple-400" />
        <h2 className="text-3xl font-bold mb-4">3D Content Unavailable</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          Your browser doesn't support WebGL, which is required for 3D content.
          Please try using a modern browser like Chrome, Firefox, or Edge.
        </p>
      </motion.div>
    </div>
  );
}