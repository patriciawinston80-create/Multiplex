import { useEffect, useRef, useState } from 'react';
import { Shield, Phone, Award, ArrowRight, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '@/data/providers';

const features = [
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'We stand behind our work with a satisfaction guarantee. Every project is completed to the highest standards.',
  },
  {
    icon: Phone,
    title: '24/7 Availability',
    description: 'Need emergency service? We are available around the clock to handle urgent repairs and installations.',
  },
  {
    icon: Award,
    title: 'Experienced Team',
    description: 'Over 15 years of experience in construction and building services. Trusted by hundreds of satisfied customers.',
  },
];

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div 
                className="absolute -inset-4 border-2 border-primary/20 rounded-2xl transform -rotate-2"
                style={{ animation: 'float-slow 8s ease-in-out infinite' }}
              />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/service-masonry.jpg"
                  alt="Construction work"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Contact Card */}
              <div 
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-card p-6 animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="text-lg font-display font-bold text-primary">{COMPANY_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* Decorative Shape */}
              <div 
                className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 
              className={`mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Why Choose{' '}
              <span className="text-primary">{COMPANY_INFO.name}</span>?
            </h2>

            <p 
              className={`text-lg text-brand-gray/70 mb-10 leading-relaxed transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {COMPANY_INFO.tagline} We are your trusted partner for all construction 
              and building needs in {COMPANY_INFO.location}. From masonry to biodigester 
              installation, we deliver quality workmanship on every project.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex gap-5 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-110 group">
                    <feature.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-semibold mb-1 text-brand-black">
                      {feature.title}
                    </h4>
                    <p className="text-brand-gray/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Location */}
            <div 
              className={`mt-8 p-4 bg-gray-50 rounded-lg flex items-center gap-3 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-brand-gray/70">{COMPANY_INFO.location}</span>
            </div>

            {/* CTA */}
            <div 
              className={`mt-10 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="btn-primary group inline-flex"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
