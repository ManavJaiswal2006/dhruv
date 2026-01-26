import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f5e6c8',
        ink: '#3e1f18',
        gryffindor: '#740001',
        gold: '#d3a625',
      },
      fontFamily: {
        magical: ['Cinzel Decorative', 'cursive'],
        handwritten: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
