import { Github, Linkedin, Youtube, Instagram, Mail } from 'lucide-react';

interface SocialLinksProps {
  size?: number;
}

export default function SocialLinks({ size = 24 }: SocialLinksProps) {
  const links = [
    { icon: Github, href: "https://github.com/SID63", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sidarthmurali-63/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCs1I7uwNB0klKbBzJ2VdsPw", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/iamsid63", label: "Instagram" },
    { icon: Mail, href: "mailto:iamsidarth@gmail.com", label: "Email" }
  ];

  return (
    <div className="flex justify-center space-x-6">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
          aria-label={link.label}
        >
          <link.icon size={size} />
        </a>
      ))}
    </div>
  );
}