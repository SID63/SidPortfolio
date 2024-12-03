import { motion } from 'framer-motion';
import SocialLinks from '../ui/SocialLinks';
import { Mail } from 'lucide-react';
import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out through any of these platforms.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <a
              href="mailto:iamsidarth@gmail.com"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full transition-colors"
            >
              <Mail size={20} />
              <span>Send me an email</span>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-6">Or find me on social media:</p>
            <SocialLinks size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}