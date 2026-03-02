import { useEffect, useRef, useState } from 'react';
import { Star, MapPin, Phone, ArrowRight, Filter, X, Search, CheckCircle } from 'lucide-react';
import { serviceProviders, COMPANY_INFO } from '@/data/providers';
import type { ServiceProvider } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ProfessionalsProps {
  searchQuery: string;
  selectedService: string;
}

const Professionals = ({ searchQuery, selectedService }: ProfessionalsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(serviceProviders);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let filtered = serviceProviders;

    // Filter by search query from hero
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (provider) =>
          provider.service.toLowerCase().includes(query) ||
          provider.specialty.toLowerCase().includes(query) ||
          provider.name.toLowerCase().includes(query)
      );
    }

    // Filter by selected service
    if (selectedService && selectedService !== 'All') {
      filtered = filtered.filter(
        (provider) => provider.service === selectedService
      );
    }

    // Filter by local search
    if (localSearch) {
      const query = localSearch.toLowerCase();
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(query) ||
          provider.service.toLowerCase().includes(query) ||
          provider.location.toLowerCase().includes(query)
      );
    }

    // Filter by active filter button
    if (activeFilter !== 'All') {
      filtered = filtered.filter((provider) => provider.service === activeFilter);
    }

    setFilteredProviders(filtered);
  }, [searchQuery, selectedService, localSearch, activeFilter]);

  const openProviderDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsDialogOpen(true);
  };

  const allServices = ['All', ...Array.from(new Set(serviceProviders.map(p => p.service)))];

  return (
    <section
      id="professionals"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-brand-light"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <h2 
              className={`mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Our Services
            </h2>
            <p 
              className={`text-lg text-brand-gray/70 max-w-xl transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Browse our comprehensive range of construction and building services. 
              All services available through one contact number.
            </p>
          </div>

          {/* Search Input */}
          <div 
            className={`relative w-full lg:w-80 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 pr-10 py-3 bg-white border-gray-200 rounded-xl focus:border-primary focus:ring-primary/20"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div 
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {allServices.map((service) => (
            <button
              key={service}
              onClick={() => setActiveFilter(service)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === service
                  ? 'bg-primary text-white'
                  : 'bg-white text-brand-gray hover:bg-gray-100'
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p 
          className={`text-sm text-brand-gray/60 mb-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Showing {filteredProviders.length} service{filteredProviders.length !== 1 ? 's' : ''}
        </p>

        {/* Services Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <div
                key={provider.id}
                className={`group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onClick={() => openProviderDetails(provider)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{provider.rating}</span>
                  </div>

                  {/* Service Badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/90 text-white hover:bg-primary">
                      {provider.service}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-brand-gray/70 mb-4 line-clamp-2">
                    {provider.about}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-brand-gray/70 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-brand-gray/50">Experience</p>
                      <p className="text-sm font-medium">{provider.experience}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Available</span>
                    </div>
                  </div>

                  {/* Hover Action */}
                  <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="w-full flex items-center justify-center gap-2 text-primary font-medium text-sm">
                      Book This Service
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">No services found</h3>
            <p className="text-brand-gray/60 mb-6">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setLocalSearch('');
                setActiveFilter('All');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Service Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProvider && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">{selectedProvider.service}</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img
                      src={selectedProvider.image}
                      alt={selectedProvider.service}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">About This Service</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProvider.about}</p>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">What We Offer</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProvider.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Location</span>
                      </div>
                      <p className="font-medium">{selectedProvider.location}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">Availability</span>
                      </div>
                      <p className="font-medium">{selectedProvider.availability}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">To book this service, contact us:</p>
                    <p className="text-2xl font-display font-bold text-primary">{COMPANY_INFO.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">{COMPANY_INFO.email}</p>
                  </div>

                  {/* Contact Button */}
                  <Button className="w-full btn-primary" asChild>
                    <a href={`tel:${COMPANY_INFO.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now to Book
                    </a>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Professionals;
