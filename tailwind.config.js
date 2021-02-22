const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: [
      './components/**/*.js',
      './pages/**/*.js',
      './lib/**/*.js',
      './layouts/**/*.js',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      colors: {
        sunset: {
          50: '#fcf8f6',
          100: '#fceeed',
          200: '#fad3da',
          300: '#f9afb8',
          400: '#fa7a84',
          500: '#f05252',
          600: '#f4303a',
          700: '#d92534',
          800: '#af1e2e',
          900: '#8c1a27',
        },
        peacock: '#005158',
        agean: '#33355D',
        'off-black': '#1b1b1f',
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          img: {
            borderRadius: '2px',
            width: '100%',
            margin: '0px',
          },
          code: {
            color: theme('colors.sunset.500'),
          },
          pre: {
            backgroundColor: '#F6F8FA',
            color: theme('colors.gray.600'),
          },
          p: {
            color: theme('colors.gray.500'),
          },
          ul: {
            color: theme('colors.gray.500'),
          },
          li: {
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
            color: theme('colors.sunset.500'),
          },
          pre: {
            backgroundColor: '#232326',
            color: theme('colors.gray.200'),
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
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'media',
};
