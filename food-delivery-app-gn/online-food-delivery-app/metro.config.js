// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Asegura que los archivos .cjs se resuelvan correctamente
defaultConfig.resolver.sourceExts.push('cjs');

// 🔧 Desactiva la resolución de "exports" para evitar errores como el de 'auth'
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
