import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, CheckCircle, Link as LinkIcon, ArrowRight } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const prefixes = [
    'Mr. & Mrs.',
    'Mr.',
    'Mrs.',
    'Ms.',
    'Dr.',
    'Rev.',
    'Hon.',
    'Prof.'
  ];

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Construct the link using the current origin
    const url = new URL(window.location.origin);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', guestName.trim());
    
    setGeneratedLink(url.toString());
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-primary/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass p-8 sm:p-12 rounded-[2.5rem] border border-white/40 shadow-2xl relative w-full max-w-2xl bg-white/70 backdrop-blur-xl z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <LinkIcon className="w-6 h-6 text-brand-primary" />
            <h1 className="text-3xl sm:text-4xl font-display text-stone-800 tracking-tight">
              Link Generator
            </h1>
          </div>
          <p className="text-stone-500/90 font-serif text-lg">
            Create personalized invitation links for your guests.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2">Prefix</label>
              <select
                className="w-full bg-white/80 px-6 py-4 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary-light/40 outline-none transition-all duration-300 appearance-none font-serif text-lg shadow-inner text-stone-700 cursor-pointer"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              >
                {prefixes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full sm:w-2/3">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2">Guest Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-white/80 px-6 py-4 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary-light/40 outline-none transition-all duration-300 font-serif text-lg shadow-inner placeholder:text-stone-300"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full bg-stone-800 text-brand-white py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-stone-900 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Link <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {generatedLink && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
              className="bg-brand-primary/5 border border-brand-primary/20 rounded-3xl p-6"
            >
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-3 ml-2">Your Unique Link</label>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full bg-white/90 px-6 py-4 rounded-full border border-brand-primary/20 font-mono text-sm text-stone-600 truncate overflow-x-auto shadow-inner flex-grow">
                  {generatedLink}
                </div>
                
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans tracking-[0.1em] font-bold text-xs uppercase transition-all duration-300 min-w-[140px] ${
                    copied 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                      : 'bg-white text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/10'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-4 px-2">
                <p className="text-xs text-stone-500 italic font-serif">
                  Preview text: <span className="text-stone-700 font-medium">With pleasure, we invite you {prefix} {guestName}</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
