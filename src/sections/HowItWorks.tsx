import { useEffect, useRef, useState } from 'react';
import { howItWorksSteps, COMPANY_INFO } from '@/data/providers';
import { Search, Phone, CheckCircle } from 'lucide-react';

const iconMap: Record<number, React.ElementType> = {
  1: Search,
  2: Phone,
  3: CheckCircle,
};

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 
            className={`mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            How It Works
          </h2>
          <p 
            className={`text-lg text-brand-gray/70 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Getting your project done is easy. Just three simple steps to quality service.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-24">
          {howItWorksSteps.map((step, index) => {
            const Icon = iconMap[step.id];
            const isEven = index % 2 === 1;
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Image */}
                <div className={`relative ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div 
                    className={`absolute -top-4 ${isEven ? '-right-4 lg:-left-4' : '-left-4'} w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}
                  >
                    <span className="text-white font-display font-bold text-xl">{step.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${isEven ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                      Step {step.id}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-display font-semibold mb-4 text-brand-black">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-brand-gray/70 leading-relaxed">
                    {step.description}
                  </p>

                  {step.id === 2 && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Call us directly:</p>
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-lg font-semibold text-primary">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <div className="flex gap-2 mt-6">
                    {howItWorksSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeStep ? 'w-8 bg-primary' : 'w-4 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-20 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="btn-primary inline-flex"
          >
            <Phone className="w-4 h-4 mr-2" />
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
