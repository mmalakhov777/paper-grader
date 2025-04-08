import React from 'react';

interface TestimonialProps {
  image: string;
  quote: string;
  name: string;
  university: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ image, quote, name, university }) => (
  <div className="flex-shrink-0 w-[280px] md:w-full flex flex-col items-start p-6 border border-[#E8E8E5] rounded-[1.25rem] lg:rounded-[2rem] h-full font-aeonik">
    <img src={`/${image}`} alt={name} className="w-16 lg:w-[100px] h-16 lg:h-[100px] mb-4" />
    <p className="text-[#232323] mb-6 text-sm md:text-sm lg:text-base leading-relaxed">{quote}</p>
    <div className="mt-auto">
      <p className="font-medium text-xl md:text-base lg:text-[1.25rem]">{name}</p>
      <p className="text-[#232323] text-sm md:text-xs lg:text-sm">{university}</p>
    </div>
  </div>
);

const PTBRCTA: React.FC = () => {
  return (
    <section className="pt-0 pb-12 lg:pt-20 lg:pb-[7.5rem] bg-[#FFFFFF] font-aeonik">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] lg:max-w-[62rem]">
          Para estudantes, pesquisadores, profissionais e todo mundo no meio do caminho
        </h2>

        {/* Testimonials Slider/Grid */}
        <div className="mt-8 lg:mt-12 mb-12 lg:mb-[7.5rem]">
          <div className="flex md:grid md:grid-cols-3 md:gap-6 lg:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-[20px] md:pl-0 -mr-4 md:mr-0">
            <div className="snap-start md:snap-none mr-4 md:mr-0">
              <Testimonial
                image="students1.png"
                quote="Eu sempre ficava travado reescrevendo o mesmo parágrafo várias vezes. Isso finalmente me mostrou o que tava errado de verdade. A estrutura tava zuada — arrumei, e minha nota subiu demais!"
                name="Samantha R."
                university="Universidade Columbia"
              />
            </div>
            <div className="snap-start md:snap-none mr-4 md:mr-0">
              <Testimonial
                image="students2.png"
                quote="Usei na noite antes da entrega. Pegou pontos fracos que eu nem vi, especialmente no fluxo dos argumentos. Fiz algumas edições e tirei a nota mais alta do semestre inteiro"
                name="Daniel M."
                university="Universidade de Boston"
              />
            </div>
            <div className="snap-start md:snap-none">
              <Testimonial
                image="students3.png"
                quote="Na real, eu só queria saber se meu trabalho tava 'bom o suficiente'. Descobri que algumas partes precisavam de ajuste. Foi rápido corrigir e me salvou de entregar algo mal feito."
                name="Michael S."
                university="Universidade da Pensilvânia"
              />
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="text-center">
          <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] mb-3 lg:mb-4">
            Mande seu melhor trabalho
          </h2>
          <p className="text-[#3C3C3C] mb-6 lg:mb-10 text-base lg:text-[1.25rem] leading-normal lg:leading-[1.75rem]">
            Pegue feedback detalhado e faça melhorias que importam — em questão de minutos
          </p>
          <a href="https://mystylus.ai/paper-grader/" className="no-underline">
            <button className="w-full md:max-w-[400px] lg:w-auto px-6 lg:px-[3.75rem] py-4 lg:py-[1.125rem] bg-[#232323] text-white rounded-full text-base lg:text-[1.25rem] font-medium mx-auto md:mx-auto">
              Dar um up no meu trabalho
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PTBRCTA; 