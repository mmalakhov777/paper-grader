import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { AIIcon, PlagiarismIcon } from './icons/Logo';
import MobileMetrics from './paper-analysis/MobileMetrics';

interface MetricCardProps {
  label: string;
  value?: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, description, className = "", children }) => {
  const isCriticalThinking = label === "Critical thinking";
  
  return (
    <div className={`bg-white rounded-[19.509px] border border-[#E8E8E5] transform shadow-[0px_19.509px_58.527px_0px_rgba(203,203,203,0.30)] transition-transform duration-300 ease-out hover:translate-y-[-8px] hover:shadow-[0px_25px_65px_0px_rgba(203,203,203,0.35)] ${className}`}>
      {isCriticalThinking ? (
        <>
          <div className="flex justify-between items-center w-full">
            <div className="text-[15px] font-medium text-[#232323] font-aeonik">{label}</div>
            <div className="text-[15px] font-medium text-[#232323] font-aeonik">{value}</div>
          </div>
          {children}
          <div className="text-[13px] font-normal text-[#6C6C6C] text-left font-aeonik mt-3">{description}</div>
        </>
      ) : (
        <>
          <div className={`text-[15px] font-medium text-[#232323] text-left font-aeonik ${label === "Evidence quality" ? "" : "mb-3"}`}>{label}</div>
          {value && <div className="text-[30px] font-medium text-[#232323] font-aeonik mb-3">{value}</div>}
          {children}
          <div className="text-[13px] font-normal text-[#6C6C6C] text-left font-aeonik">{description}</div>
        </>
      )}
    </div>
  );
};

const PaperAnalysis: React.FC = () => {
  const aiCardRef = useRef<HTMLDivElement>(null);
  const evidenceCardRef = useRef<HTMLDivElement>(null);
  const plagiarismCardRef = useRef<HTMLDivElement>(null);
  const criticalCardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определение мобильного устройства
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Начальная проверка
    checkMobile();
    
    // Обработчик скролла для анимации
    const handleScroll = () => {
      if (isMobile) return; // Отключаем тяжелые анимации на мобильных устройствах
      
      const scrolled = window.scrollY;
      
      if (aiCardRef.current) {
        aiCardRef.current.style.transform = `translate3d(0, ${scrolled * -0.1}px, 0) scale(${window.innerWidth >= 1536 ? 1 : window.innerWidth >= 1280 ? 0.85 : window.innerWidth >= 1024 ? 0.65 : window.innerWidth >= 768 ? 0.6 : window.innerWidth >= 640 ? 0.55 : 0.45}) rotate(-6deg)`;
      }
      if (evidenceCardRef.current) {
        evidenceCardRef.current.style.transform = `translate3d(${window.innerWidth >= 768 ? '0' : '30%'}, ${scrolled * -0.08}px, 0) scale(${window.innerWidth >= 1536 ? 1 : window.innerWidth >= 1280 ? 0.85 : window.innerWidth >= 1024 ? 0.65 : window.innerWidth >= 768 ? 0.6 : window.innerWidth >= 640 ? 0.55 : 0.45}) rotate(-4.906deg)`;
      }
      if (plagiarismCardRef.current) {
        plagiarismCardRef.current.style.transform = `translate3d(0, ${scrolled * -0.12}px, 0) scale(${window.innerWidth >= 1536 ? 1 : window.innerWidth >= 1280 ? 0.85 : window.innerWidth >= 1024 ? 0.65 : window.innerWidth >= 768 ? 0.6 : window.innerWidth >= 640 ? 0.55 : 0.45}) rotate(6deg)`;
      }
      if (criticalCardRef.current) {
        criticalCardRef.current.style.transform = `translate3d(0, ${scrolled * -0.15}px, 0) scale(${window.innerWidth >= 1536 ? 1 : window.innerWidth >= 1280 ? 0.85 : window.innerWidth >= 1024 ? 0.65 : window.innerWidth >= 768 ? 0.6 : window.innerWidth >= 640 ? 0.55 : 0.45}) rotate(6deg)`;
      }
    };
    
    // Слушатели событий
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    // Очистка
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="relative pt-6 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side metrics */}
        <div className="relative z-0 hidden md:flex justify-end min-h-[460px]">
          <div className="absolute top-0 left-[10%] w-full" ref={aiCardRef}>
            <MetricCard
              label="AI Content"
              value="70%"
              description="High AI probability"
              className="flex flex-col items-start w-[264.139px] p-[27.565px] relative transition-transform duration-300 ease-out hover:shadow-[0px_25px_65px_0px_rgba(203,203,203,0.35)]"
            >
              <div className="absolute top-4 right-4">
                <AIIcon className="w-[72px] h-[72px] rotate-[8deg]" />
              </div>
            </MetricCard>
          </div>
          <div className="absolute left-0 md:left-[50px] lg:left-[100px] xl:left-[200px] 2xl:left-[200px] min-[1550px]:left-[280px] top-[380px] sm:top-[400px] md:top-[250px] lg:top-[250px] xl:top-[250px] 2xl:top-[250px]" ref={evidenceCardRef}>
            <MetricCard
              label="Evidence quality"
              description="Weak supporting evidence"
              className="flex flex-col items-start w-[264.139px] p-6 rounded-[17.214px] border-[0.861px] border-[#E8E8E5] shadow-[0px_20px_60px_0px_rgba(203,203,203,0.30)] transition-transform duration-300 ease-out hover:shadow-[0px_25px_65px_0px_rgba(203,203,203,0.35)]"
            >
              <svg width="170" height="19" viewBox="0 0 170 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                <rect x="0.626953" y="8" width="168.902" height="3.44285" rx="1.72143" fill="#E8E8E5"/>
                <rect x="0.626953" y="8" width="118.684" height="3.44285" rx="1.72143" fill="#FED770"/>
              </svg>
            </MetricCard>
          </div>
        </div>

        {/* Center content */}
        <div className="md:col-span-1 relative z-20 flex justify-center">
          <div className="flex flex-col items-center w-full min-w-[380px] lg:min-w-[517px] max-w-[550px] h-[460px] px-6 sm:px-12 lg:px-20 py-16 gap-6 rounded-t-[24px] border-t border-r border-l border-[#E8E8E5] bg-white transform origin-top scale-[0.85] sm:scale-[0.9] lg:scale-100">
            <h2 className="text-[20px] font-medium font-aeonik text-center text-[#6C6C6C]">Introduction</h2>
            <div className="relative w-full">
              <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-white/80 via-white/60 to-transparent pointer-events-none"></div>
              <p className="text-[12px] font-aeonik leading-relaxed text-left text-[#232323]">
                Plastic pollution has become a critical environmental issue affecting marine ecosystems globally. This paper explores the extent and impact of plastic waste on marine life, highlighting how both macroplastics and microplastics contribute to the degradation of oceanic environments. Through an analysis of recent studies, we examine the sources of plastic pollution, including land-based activities and maritime industries, and their pathways into the marine ecosystem. The effects on marine organisms are profound, ranging from physical harm due to ingestion and entanglement to chemical toxicity affecting reproductive and growth processes. The disruption of food chains and habitats not only threatens biodiversity but also has significant socio-economic repercussions for communities reliant on marine resources. This study underscores the urgency for comprehensive strategies to combat plastic waste.
              </p>
            </div>
          </div>
        </div>

        {/* Right side metrics */}
        <div className="relative hidden md:block min-h-[460px]">
          <div className="absolute top-[-30px] right-[-10px] md:right-[10px] lg:right-[30px] z-40" ref={plagiarismCardRef}>
            <div className="relative">
              <MetricCard
                label="Plagiarism"
                value="60%"
                description="High risk of plagiarism"
                className="flex flex-col items-start w-[264.139px] p-[27.565px] rounded-[19.771px] border-[0.989px] border-[#E8E8E5] shadow-[0px_19.771px_59.314px_0px_rgba(203,203,203,0.30)] transition-transform duration-300 ease-out hover:shadow-[0px_25px_65px_0px_rgba(203,203,203,0.35)]"
              />
              <div className="absolute top-8 right-4">
                <PlagiarismIcon className="w-[72px] h-[72px]" />
              </div>
            </div>
          </div>
          <div className="absolute top-[300px] right-[180px] md:right-[140px] lg:right-[180px] z-30" ref={criticalCardRef}>
            <div className="relative">
              <MetricCard
                label="Critical thinking"
                value="9%"
                description="Limited critical analysis"
                className="flex flex-col items-start w-[240px] p-6 rounded-[17.214px] border-[0.861px] border-[#E8E8E5] shadow-[0px_20px_60px_0px_rgba(203,203,203,0.30)] transition-transform duration-300 ease-out hover:shadow-[0px_25px_65px_0px_rgba(203,203,203,0.35)]"
              >
                <div className="mt-3">
                  <svg width="154" height="4" viewBox="0 0 154 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="154.144" height="3.44285" rx="1.72143" fill="#E8E8E5"/>
                    <rect width="14.5632" height="3.44285" rx="1.72143" fill="#FF70A6"/>
                  </svg>
                </div>
              </MetricCard>
            </div>
          </div>
        </div>

        {/* Mobile metrics - прямой импорт вместо ленивой загрузки */}
        {isMobile && <MobileMetrics />}
      </div>
    </div>
  );
};

export default PaperAnalysis; 