const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const DashboardPlugin = require('@module-federation/dashboard-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index',
  mode: isProduction ? 'production' : 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    allowedHosts: ['localhost'],
    port: 5001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: {
      index: 'index.html', // open index page for any missing route
    },
  },
  output: {
    filename: 'assets/js/[name].[chunkhash].js',
    publicPath: 'auto', // must be auto for Module Federation!
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.less'],
    alias: {
      public: path.resolve(__dirname, 'public/'),
    },
  },
  module: {
    rules: [
      {
        // https://github.com/webpack/webpack/issues/11467#issuecomment-691702706
        // https://github.com/vercel/next.js/pull/17095
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=assets/image/[name]-[hash].[ext]',
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader?limit=30000&name=assets/fonts/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.scss|\.css$/,
        use: [
          isProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '', // fix at build Error: Automatic publicPath is not supported in this browser
                },
              }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: isProduction ? '[hash:base64]' : '[local]---[path][name]',
              },
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host5001',
      // library: { type: 'var', name: 'host5001' },
      // filename: 'remoteEntry.js',
      remotes: {
        /* ✨✨✨ `@` is an undocumented DamnMagic! 🤯 */
        remote5002: 'remote5002@',
      },
      shared: {
        react: {
          requiredVersion: '17.0.1',
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),

    // Run docker run -p 3000:3000 -it scriptedalchemy/mf-dashboard:latest
    new DashboardPlugin({
      dashboardURL: 'http://localhost:3000/api/update',
    }),
    isProduction
      ? new MiniCssExtractPlugin({
          filename: 'assets/css/[name].css',
        })
      : false,
  ].filter(Boolean),
};
