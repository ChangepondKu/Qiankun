module.exports = function override(config) {
    config.output.library = 'microApp3'; // Replace with your micro-app's name
    config.output.libraryTarget = 'umd'; // Use UMD format for Qiankun compatibility
    config.output.publicPath = '//localhost:3003/'; // Replace with your micro-app's dev server URL
    return config;
};
