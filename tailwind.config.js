const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.js',
    './pages/**/*.js',
    './lib/**/*.js',
    './layouts/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      colors: {
        primary: '#f05252',
        peacock: '#005158',
        agean: '#33355D',
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          img: {
            borderRadius: '2px',
            width: '100%',
          },
          code: {
            color: theme('colors.primary'),
          },
          pre: {
            backgroundColor: '#F6F8FA',
            color: theme('colors.gray.600'),
          },
          a: {
            color: theme('colors.gray.600'),
            textDecoration: 'none',
            borderBottomWidth: '1px',
            borderColor: 'rgba(0, 0, 0, .3)',
            borderStyle: 'dotted',
            '&:hover': {
              color: theme('colors.gray.900'),
            },
          },
        },
      },
    }),
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
  future: {
    removeDeprecatedGapUtilities: true,
    defaultLineHeights: true,
    standardFontWeights: true,
    purgeLayersByDefault: true,
  },
};
