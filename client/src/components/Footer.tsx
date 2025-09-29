export function Footer() {
  const socialLinks = [
    {
      icon: "fab fa-linkedin",
      href: "https://www.linkedin.com/in/omoberoi",
      label: "LinkedIn",
    },
    {
      icon: "fab fa-github",
      href: "https://github.com/0m0beroi",
      label: "GitHub",
    },
    {
      icon: "fas fa-code",
      href: "https://leetcode.com/u/0m0beroi",
      label: "LeetCode",
    },
    {
      icon: "fab fa-instagram",
      href: "https://www.instagram.com/0m0beroi",
      label: "Instagram",
    },
  ];

  return (
    <footer className="py-12 glassmorphism mt-20" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text mb-4" data-testid="footer-logo">
            Om Oberoi
          </div>
          <p className="text-muted-foreground mb-6" data-testid="footer-description">
            Electronics & Communication Engineer | Innovating at the intersection of hardware and software
          </p>

          <div className="flex justify-center space-x-6 mb-6" data-testid="footer-social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={link.label}
                data-testid={`footer-social-${link.label.toLowerCase()}`}
              >
                <i className={`${link.icon} text-xl`}></i>
              </a>
            ))}
          </div>

          <div className="border-t border-border pt-6 text-sm text-muted-foreground" data-testid="footer-copyright">
            <p>&copy; 2024 Om Oberoi. All rights reserved. | Built with React, Node.js & MongoDB</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
