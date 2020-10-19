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
        'off-black': '#282c38',
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
          p: {
            color: theme('colors.gray.500'),
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
      dark: {
        css: {
          color: theme('colors.gray.200'),
          code: {
            color: theme('colors.primary'),
          },
          pre: {
            backgroundColor: theme('colors.gray.700'),
            color: theme('colors.gray.100'),
          },
          p: {
            color: theme('colors.gray.400'),
          },
          b: {
            color: theme('colors.gray.300'),
          },
          ul: {
            color: theme('colors.gray.400'),
          },
          li: {
            color: theme('colors.gray.400'),
          },
          h1: {
            color: theme('colors.gray.100'),
          },
          h2: {
            color: theme('colors.gray.100'),
          },
          h3: {
            color: theme('colors.gray.200'),
          },
          h4: {
            color: theme('colors.gray.200'),
          },
          h5: {
            color: theme('colors.gray.200'),
          },
          a: {
            color: theme('colors.gray.200'),
            textDecoration: 'none',
            borderBottomWidth: '1px',
            borderColor: 'rgba(255, 255, 255, .3)',
            borderStyle: 'dotted',
            '&:hover': {
              color: theme('colors.gray.400'),
            },
          },
        },
      },
    }),
  },
  variants: {
    typography: ['responsive', 'dark'],
  },
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
  future: {
    removeDeprecatedGapUtilities: true,
    defaultLineHeights: true,
    standardFontWeights: true,
    purgeLayersByDefault: true,
  },
  dark: 'media',
  experimental: {
    darkModeVariant: true,
  },
};
