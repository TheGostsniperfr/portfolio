export interface Project {
  /** Route segment: /Projects/<slug>. Must match the .vue filename in pages/Projects/. */
  slug: string
  /** i18n key under `projects.` — resolves to the displayed title. */
  titleKey: string
  /** Shown when the i18n key is missing, so a new project renders before it is translated. */
  fallbackTitle: string
  /** Source path under public/. The optimizer derives the avif/webp variants from it. */
  cover: string
  year: number
  tags: string[]
  /** Drives the halo and focus ring of the centered slide. */
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'ArfforniaProject',
    titleKey: 'projects.arffornia.title',
    fallbackTitle: 'Arffornia Project',
    cover: '/images/Arffornia/launcher_homepage.png',
    year: 2024,
    tags: [ 'Kubernetes', 'Laravel', 'Electron' ],
    accent: '#4ade80',
  },
  {
    slug: 'OCRSudoku-Forgers',
    titleKey: 'projects.ocr.title',
    fallbackTitle: 'OCR Sudoku-Forgers',
    cover: '/images/OCR/logo.png',
    year: 2023,
    tags: [ 'C', 'Neural Network', 'Computer Vision' ],
    accent: '#60a5fa',
  },
  {
    slug: 'UpsideDown',
    titleKey: 'projects.ud.title',
    fallbackTitle: 'Upside Down',
    cover: '/images/UpsideDown/UpsideDownBG.png',
    year: 2023,
    tags: [ 'Unity', 'C#', 'Game Design' ],
    accent: '#a78bfa',
  },
  {
    slug: 'Toolchain',
    titleKey: 'projects.tc.title',
    fallbackTitle: 'Toolchain',
    cover: '/images/TC/logo_back.png',
    year: 2024,
    tags: [ 'Docker', 'GitLab CI', 'DevOps' ],
    accent: '#fb923c',
  },
  {
    slug: 'ACDC',
    titleKey: 'projects.acdc.title',
    fallbackTitle: 'ACDC',
    cover: '/images/ACDC/logo_tp.png',
    year: 2024,
    tags: [ 'Teaching', 'Design', 'Community' ],
    accent: '#f472b6',
  },
  {
    slug: 'Portfolio',
    titleKey: 'projects.portfolio.title',
    fallbackTitle: 'Portfolio',
    cover: '/images/other/portfolio_home.png',
    year: 2025,
    tags: [ 'Nuxt', 'Vue', 'TypeScript' ],
    accent: '#38bdf8',
  },
]
