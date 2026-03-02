import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { serviceCategories, COMPANY_INFO } from '@/data/providers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof serviceCategories[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const openServiceDetails = (service: typeof serviceCategories[0]) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-brand-light"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 
            className={`mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Services
          </h2>
          <p 
            className={`text-lg text-brand-gray/70 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Professional construction and building services for all your project needs. 
            Quality workmanship guaranteed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((service, index) => (
            <div
              key={service.id}
              className={`group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => openServiceDetails(service)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Service Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-display font-semibold text-white">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-brand-gray/70 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Action */}
                <button className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-gray/60 mb-4">
            Need a custom solution? Contact us for a free consultation.
          </p>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="btn-primary inline-flex"
          >
            <Phone className="w-4 h-4" />
            Call {COMPANY_INFO.phone}
          </a>
        </div>

        {/* Service Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">{selectedService.name}</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">
                    {selectedService.description}
                  </p>

                  {/* Contact Info */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-2">Contact us to book this service:</p>
                    <p className="text-lg font-semibold text-primary">{COMPANY_INFO.phone}</p>
                    <p className="text-sm text-gray-600">{COMPANY_INFO.email}</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 btn-primary" asChild>
                      <a href={`tel:${COMPANY_INFO.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Services;
