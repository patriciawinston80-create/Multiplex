import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '@/data/providers';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-primary relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Floating Shapes */}
      <div 
        className="absolute top-10 left-10 w-8 h-8 border border-white/20 rounded-lg animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-20 right-20 w-6 h-6 bg-white/10 rounded-full animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-10 left-1/4 w-10 h-10 border border-white/10 rounded-xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{COMPANY_INFO.tagline}</span>
          </div>

          {/* Title */}
          <h2 
            className={`text-4xl lg:text-5xl font-display font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Start Your Project?
          </h2>

          {/* Description */}
          <p 
            className={`text-lg text-white/80 mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Contact {COMPANY_INFO.name} today for a free quote. We are ready to help 
            with all your construction and building needs in {COMPANY_INFO.location}.
          </p>

          {/* Contact Info */}
          <div 
            className={`grid md:grid-cols-3 gap-6 mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/60 mb-1">Call Us</p>
              <a href={`tel:${COMPANY_INFO.phone}`} className="text-lg font-semibold text-white hover:underline">
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/60 mb-1">Email Us</p>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-lg font-semibold text-white hover:underline">
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/60 mb-1">Visit Us</p>
              <p className="text-lg font-semibold text-white">{COMPANY_INFO.location}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div 
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now for Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Trust Text */}
          <p 
            className={`text-sm text-white/60 mt-6 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Free quotes • No obligation • Quality guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
