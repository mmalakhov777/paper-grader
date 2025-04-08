import React, { useEffect } from 'react';
import ESHeader from '@/components/es/ESHeader';
import ESHeroSection from '@/components/es/ESHeroSection';
import ESLogoCloud from '@/components/es/ESLogoCloud';
import ESFeatures from '@/components/es/ESFeatures';
import ESTestimonials from '@/components/es/ESTestimonials';
import ESPricing from '@/components/es/ESPricing';
import ESHowItWorks from '@/components/es/ESHowItWorks';
import ESCTA from '@/components/es/ESCTA';
import ESFooter from '@/components/es/ESFooter';

const ESHome: React.FC = () => {
  useEffect(() => {
    // Update document title for Spanish
    document.title = 'myStylus - Corrige y Mejora tu Trabajo en Minutos';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'myStylus te ayuda a crear contenido perfecto analizando tu texto y proporcionando sugerencias en tiempo real para mejorar tu estilo de escritura, claridad e impacto.');
    
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetId = target.getAttribute('href') as string;
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased">
      <ESHeader />
      <ESHeroSection />
      <ESLogoCloud />
      <ESFeatures />
      <ESTestimonials />
      <ESPricing />
      <ESHowItWorks />
      <ESCTA />
      <ESFooter />
    </div>
  );
};

export default ESHome; 