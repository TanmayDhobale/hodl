module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@solana-mobile/mobile-wallet-adapter-protocol': '@solana-mobile/mobile-wallet-adapter-protocol/lib/esm/index.js',
        },
      }],
      'react-native-reanimated/plugin',
    ],
  };
};
