import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export const AddressesSection: React.FC = () => {
  
  const handleGetDirections = (url: string) => {
    window.open(url, '_blank');
  };

  const addressesData = {
    event: {
      title: 'Poruwa & Celebration',
      name: 'The Epitome Hotel',
      address: 'Kurunegala',
      url: 'https://maps.app.goo.gl/agkF5ELNNjynXQAU8'
    }
  };

  return (
    <div className="w-full flex justify-center bg-brand-ivory">
      <div className="w-full bg-brand-dark text-white px-6 py-16 flex flex-col items-center shadow-md rounded-3xl relative overflow-hidden">
        
        {/* Rich dark overlay background image as pictured (wood, brick, mansion walls lit by gold) */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
            alt="Mansion Dining Room Backdrop"
            className="w-full h-full object-cover filter mix-blend-overlay scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient overlay vignette */}
        <div className="absolute inset-0 bg-brand-dark/90 z-0 pointer-events-none" />

        {/* Section Heading inside the dark frame */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 z-10"
        >
          <h2 className="font-display font-light text-3xl sm:text-4xl text-brand-champagne leading-none tracking-[0.25em] uppercase">
            ADDRESSES
          </h2>
          <div className="w-8 h-[1px] bg-brand-champagne/40 mx-auto mt-4" />
        </motion.div>

        {/* Addresses list with delicate sparkles and elegant diamond line connectors */}
        <div className="w-full px-4 sm:px-12 max-w-2xl space-y-8 z-10 relative">
          
          {/* Item 1: Event */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 relative group"
          >
            {/* Elegant sparkling diamond connector mark */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 bg-brand-champagne rotate-45 flex-shrink-0 animate-pulse" />
              <div className="w-[1px] h-20 bg-brand-champagne/20 mt-2" />
            </div>
            
            <div className="text-left flex-1 -mt-1.5 pb-2">
              <span className="font-serif italic text-lg text-brand-champagne font-medium block">
                {addressesData.event.title}
              </span>
              <strong className="font-serif text-sm block mt-0.5 font-semibold text-white/95">
                {addressesData.event.name}
              </strong>
              <p className="font-serif text-xs leading-relaxed text-brand-champagne/70 font-light mt-1">
                {addressesData.event.address}
              </p>
              
              <button
                onClick={() => handleGetDirections(addressesData.event.url)}
                id="btn-nav-event"
                className="mt-2.5 flex items-center gap-1 text-[10px] uppercase font-sans tracking-widest text-brand-champagne hover:text-white transition-colors duration-300 font-semibold cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-brand-champagne" />
                Get Directions
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
