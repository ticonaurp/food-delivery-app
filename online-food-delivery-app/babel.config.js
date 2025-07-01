module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin',                // ya lo tenías
    '@babel/plugin-proposal-optional-chaining'       // ← este es nuevo
  ],
};
