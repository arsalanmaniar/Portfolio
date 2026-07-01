export type NavItem = {
  label: string;
  href: string;
};

/*
 * The site is a single scrolling page: section anchors live on "/".
 * Absolute "/#id" hrefs mean the links also work from the standalone
 * /about, /projects and /contact routes (navigate home, then scroll).
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const socials = {
  email: "hafizarsalan125@gmail.com",
  linkedin: "https://www.linkedin.com/in/arsalan-maniar-7b7746352/",
  github: "https://github.com/arsalanmaniar",
};
