const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'


// Configure rules for the style loader:
function configureCss(modules = false, sass = false) {
  const loaders = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: modules,
        sourceMap: !isProd,
      },
    },
    {
      loader: 'postcss-loader',
    }
  ]

  if (sass) {
    loaders.push({
      loader: 'sass-loader',
      options: { sourceMap: !isProd },
    })
  }

  return loaders
}


// Configure plugins:
function configurePlugins() {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'assets/css/[name].[contenthash].css' : '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: ['**/index.html']
          },
        },
      ],
    }),
  ]

  if (!isProd) {
    plugins.push(
      new ESLintPlugin({
        context: path.resolve(__dirname, './src'),
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        quiet: false,
      })
    )
  }

  if (isProd) {
    plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        disableDevLogs: true
      })
    )
  }

  return plugins
}


module.exports = {
  mode: isProd ? 'production' : 'development',
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8080',
      '/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
  devtool: isProd ? false : 'source-map',
  entry: {
    app: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, './build'),
    filename: isProd ? 'assets/js/[name].[contenthash].js' : '[name].js',
  },
  performance: {
    hints: isProd ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 512000,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader'
        ],
      },
      {
        test: /(?<!module)\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: configureCss(false, true)
      },
      {
        test: /\.module\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: configureCss(true, true)
      },
      {
        test: /(?<!module)\.css$/i,
        exclude: /node_modules/,
        use: configureCss(),
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: configureCss(true),
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: isProd
            ? 'assets/images/[name][contenthash][ext]'
            : 'assets/images/[name][ext]',
        }
      },
      {
        test: /\.([ot]tf|woff2?|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: isProd
            ? 'assets/fonts/[name][contenthash][ext]'
            : 'assets/fonts/[name][ext]',
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass'],
  },
  plugins: configurePlugins(),
}
