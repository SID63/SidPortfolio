export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface SocialLink {
  icon: React.ComponentType;
  href: string;
  label: string;
}