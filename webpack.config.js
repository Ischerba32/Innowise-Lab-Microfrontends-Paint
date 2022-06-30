const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require('dotenv-webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Innowise",
    projectName: "mini-paint",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          include: /src/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('style-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
            },
            {
              loader: require.resolve('css-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
            },
            {
              loader: require.resolve('sass-loader', {
                paths: [require.resolve('webpack-config-single-spa-react-ts')],
              }),
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv()
    ],
  });
};
