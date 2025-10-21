export const SITE_CONFIG = {
  DEFAULT_IMAGE: '/placeholder.png',
  BASE_PATH: '',
  LOCALE: 'gl'
} as const

export const FAVICON_PATHS = {
  APPLE_TOUCH: '/apple-touch-icon.png',
  FAVICON_32: '/favicon-32x32.png',
  FAVICON_16: '/favicon-16x16.png',
  MANIFEST: '/site.webmanifest'
} as const

export const THEME_CONFIG = {
  STORAGE_KEY: 'theme',
  DEFAULT_THEME: 'light',
  DARK_THEME: 'dark',
  ATTRIBUTE_NAME: 'data-theme'
} as const

export const NAVIGATION_LINKS = {
  COMMUNITIES: '#comunidades',
  EVENTS: '#eventos'
} as const
