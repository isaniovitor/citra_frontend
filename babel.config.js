module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["@babel/preset-react"],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
      ],
    ],
  };
};
