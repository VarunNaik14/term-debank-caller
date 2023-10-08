/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    colors: {
      black: '000000',
      lightblue: '0040A5',
      white: 'FCFCFC',
      gray: '938BA1',
      darkblue: '1D00A5',


    },    

  fontFamily: {
    sans: [
      '"Inter var", font-mono',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32'
      },
    ],
  },

    extend: {
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',

        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}

