/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cimaise: 'rgb(var(--color-cimaise) / <alpha-value>)',
        oeuvre: 'rgb(var(--color-oeuvre) / <alpha-value>)',
        encre: 'rgb(var(--color-encre) / <alpha-value>)',
        cartel: 'rgb(var(--color-cartel) / <alpha-value>)',
        filet: 'rgb(var(--color-filet) / <alpha-value>)',
        point: 'rgb(var(--color-point) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Marcellus', 'Times New Roman', 'serif'],
        lecture: ['Source Serif 4', 'Georgia', 'serif'],
        signal: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
