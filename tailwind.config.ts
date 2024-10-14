import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{colors: {
      "dark-layer-1": "rgb(40,40,40)",
      "dark-layer-2": "rgb(26,26,26)",
      'side':'#DFECF9',
      "dark-label-2": "rgba(239, 241, 246, 0.75)",
      "dark-divider-border-2": "rgb(61, 61, 61)",
      "dark-fill-2": "hsla(0,0%,100%,.14)",
      "dark-fill-3": "hsla(0,0%,100%,.1)",
      "dark-gray-6": "rgb(138, 138, 138)",
      "dark-gray-7": "rgb(179, 179, 179)",
    },
  fontFamily:{
    sans:['Poppins'],
    'playwrite-nl': ['Playwrite NL', 'sans-serif'],
  }
  }
  },
  plugins: [],
}
export default config
