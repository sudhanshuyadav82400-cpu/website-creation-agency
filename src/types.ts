export interface QuestionnaireFormData {
  clientName: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  city: string;
  stateProvince: string;
  country: string;
  zipPostalCode: string;
  currentWebsite: string;
  socialMediaLinks: string;
  businessDescription: string;
  websiteType: string;
  numberOfPages: string;
  requiredFeatures: string[];
  estimatedBudget: string;
  targetLaunchSchedule: string;
  projectDescription: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  businessName: string;
  message: string;
}

export interface DemoProject {
  id: string;
  title: string;
  category: 'Business Website' | 'Restaurant Website' | 'Dental Clinic Website' | 'E-commerce Website' | 'Service Business Website' | 'Modern Landing Page';
  categoryLabel: string;
  summary: string;
  badge: 'Demo Project';
  features: string[];
  techStack: string[];
  accentColor: string;
  imageUrl: string;
  imageAlt: string;
  previewUrlPlaceholder?: string;
  highlights: { label: string; val: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: 'Building2' | 'Rocket' | 'ShoppingBag' | 'Smartphone' | 'RefreshCw' | 'Cpu';
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  badge?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}
