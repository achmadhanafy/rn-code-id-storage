module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '@code-module-auth': './src/module/auth',
          '@code-components': './src/components',
          '@code-navigation': './src/navigation',
          '@code-store': './src/store',
        },
      },
    ],
    'jest-hoist',
  ],
};
