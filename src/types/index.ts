export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  image: string;
  experience: string;
  about: string;
  services: string[];
  availability: string;
  priceRange: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  website: string;
  location: string;
}
