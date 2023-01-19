/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#2A4878",
              "@font-family": "Roboto",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    host: "0.0.0.0",
  },
};
