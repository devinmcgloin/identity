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
              './layout/**/*.{js,jsx,ts,tsx}',
              './content/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/.:]+(?<!:)/g) || [],
          },
        ]
      : undefined,
    'autoprefixer',
  ],
};
