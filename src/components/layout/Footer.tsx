'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Protein Bars', href: '/products/protein-bars' },
        { name: 'Natural Biscuits', href: '/products/biscuits' },
        { name: 'Peanut Butter', href: '/products/spreads' },
        { name: 'Organic Snacks', href: '#' }
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/#about-us' },
        { name: 'Our Story', href: '#' },
        { name: 'Mission', href: '#' },
        { name: 'Team', href: '#' }
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' }
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: 'https://www.instagram.com/marva_organics?igsh=MXMyazFjcnAwaXlzcA==' },
    { icon: Twitter, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4">MARVA</h3>
            <p className="text-gray-400 mb-4">
              Providing healthy, natural, and delicious protein bars, biscuits, and spreads for your active lifestyle.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-green-400 transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>marvaorganics@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 MARVA Organics. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
