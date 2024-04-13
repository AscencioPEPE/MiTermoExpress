const config = {
  '*.{js,jsx,ts,tsx}': [
    'npx eslint . --ext .ts --ext .tsx --max-warnings 0',
    'npx prettier --write .',
    "npx cspell '**/*.{ts, tsx}'",
  ],
  '*.json': 'prettier --write',
  '*.js': 'eslint --cache --fix',
  '*.{js,css,md}': 'prettier --write',
};

module.exports = config;
