export type Visibility = "Public" | "Recruiters Only" | "Private";

export interface BasicInfo {
  fullName: string;
  professionalTitle: string;
  profilePicture: string; // Base64
  coverBanner: string; // Base64
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  startYear: string;
  endYear: string;
  score: string; // CGPA/Percentage
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemoLink: string;
  images: string[]; // Base64 array
  video: string; // Base64
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  certificateImage: string; // Base64
}

export interface Achievement {
  id: string;
  title: string;
  type: "Award" | "Competition" | "Hackathon" | "Sports" | "Publication" | "Other";
  description: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  youtube: string;
  behance: string;
  dribbble: string;
  medium: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Fluent" | "Native";
}

export interface PrivacyControls {
  email: Visibility;
  phone: Visibility;
  resume: Visibility;
  projects: Visibility;
  achievements: Visibility;
  socialLinks: Visibility;
}

export interface PortfolioData {
  userId: string;
  usernameSlug: string; // Used for the public URL /portfolio/slug
  isPublished: boolean;
  completionPercentage: number;
  lastUpdated: string;
  
  basicInfo: BasicInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  resume: string; // Base64 PDF
  achievements: Achievement[];
  socialLinks: SocialLinks;
  languages: Language[];
  interests: string[];
  
  privacyControls: PrivacyControls;
}
