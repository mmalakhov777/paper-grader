import React from 'react';
import { FileEdit, CheckCircle, BookOpen, Clock } from 'lucide-react';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-row items-start md:flex-col md:items-center md:text-center gap-3 md:gap-4">
    <div className="mb-0 md:mb-4">
      {icon}
    </div>
    <div>
      <h3 className="text-[15px] md:text-base lg:text-base font-medium mb-1 md:mb-2">{title}</h3>
      <p className="text-[#666666] text-sm">{description}</p>
    </div>
  </div>
);

const ProofreadingBenefitsPT: React.FC = () => {
  return (
    <section className="py-6 md:py-10 bg-[#FFFFFF] border-t border-b border-[#E8E8E5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-[1240px] mx-auto">
          <FeatureItem
            icon={<FileEdit className="w-6 h-6 md:w-8 md:h-8" />}
            title="Revisão de Português"
            description="Serviços profissionais de revisão e edição para trabalhos académicos e ensaios"
          />
          <FeatureItem
            icon={<CheckCircle className="w-6 h-6 md:w-8 md:h-8" />}
            title="Revisão por IA"
            description="Ferramentas avançadas de revisão com IA, com feedback instantâneo e sugestões"
          />
          <FeatureItem
            icon={<BookOpen className="w-6 h-6 md:w-8 md:h-8" />}
            title="Edição Académica"
            description="Serviços especializados de edição de teses e manuscritos para investigadores"
          />
          <FeatureItem
            icon={<Clock className="w-6 h-6 md:w-8 md:h-8" />}
            title="Serviço 24/7"
            description="Assistência profissional de revisão online disponível a qualquer hora"
          />
        </div>
      </div>
    </section>
  );
};

export default ProofreadingBenefitsPT; 