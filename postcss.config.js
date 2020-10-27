module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production'
      ? [
          '@fullhuman/postcss-purgecss',
          {
            content: [
              './pages/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
              './lib/**/*.{js,jsx,ts,tsx}',
              './layouts/**/*.{js,jsx,ts,tsx}',
              './content/**/*.{js,jsx,ts,tsx}',
            ],
            whitelist: [
              'html',
              'body',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'p',
              'hr',
              'a',
              'b',
              'ul',
              'li',
              'ol',
              'code',
              'pre',
              'small',
              'blockquote',
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/.:]+(?<!:)/g) || [],
          },
        ]
      : undefined,
    'autoprefixer',
  ],
};
