export const viewsConfig = {
  home: {
    label: 'Inicio',
    icon: 'home',
    href: '#home'
  },
  about: {
    label: 'Sobre mí',
    icon: 'user',
    href: '#about'
  },
  skills: {
    label: 'Habilidades',
    icon: 'code',
    href: '#skills'
  },
  projects: {
    label: 'Proyectos',
    icon: 'folder',
    href: '#projects'
  },
  contact: {
    label: 'Contacto',
    icon: 'mail',
    href: '#contact'
  }
} as const

export type ViewKey = keyof typeof viewsConfig