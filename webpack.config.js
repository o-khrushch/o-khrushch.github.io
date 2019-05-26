'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const parseRepositories = require('./utils/parseRepositories')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parseProfile = require('./utils/parseProfile')
const config = require('./config')
const path = require('path')

module.exports = async (env, argv) => {

  /** @type {string} */
  const template = config.template || 'default'

  /** @type {boolean} */
  const isProd = argv.mode === 'production'

  /*
   * Get data from API and inject to .html file
   */
  const repositories = await parseRepositories()
  const profile = await parseProfile()
  if (!repositories || !profile) {
    console.log('[Process]: Repositories or profile is empty')
    process.exit(0)
  }

  return {
    mode: argv.mode,
    entry: {
      main: [
        `./src/templates/${template}/index.js`,
        `./src/templates/${template}/index.scss`
      ]
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/images'
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/files'
              }
            }
          ]
        },
        {
          test: /\.s?css/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        }
      ]
    },
    plugins: [
      /**
       * Remove build folder(s) before building.
       * @see https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin,
      /**
       * Simplifies creation of HTML files to serve your webpack bundles.
       * @see https://github.com/jantimon/html-webpack-plugin
       * @example
       *  In the .html file you can get a profile from GitHub and its repositories.
       *    htmlWebpackPlugin.options._profile or htmlWebpackPlugin.options._repositories
       *  Get a variable:
       *    <% if (htmlWebpackPlugin.options._profile.id === 1) { /* code *\/ } %>
       *  Insert data from a variable:
       *    <%= htmlWebpackPlugin.options._profile.id %>
       */
      new HtmlWebpackPlugin(Object.assign({
        _config: config,
        _profile: profile,
        _repositories: repositories
      }, {
        filename: 'index.html',
        template: `./src/templates/${template}/index.html`,
        inject: true,
        minify: isProd,
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          description: `Portfolio by ${profile.name}`,
          robots: 'index, follow'
        }
      })),
      /**
       * Creates a CSS file per JS file which contains CSS
       * @see https://github.com/webpack-contrib/mini-css-extract-plugin
       */
      new MiniCssExtractPlugin({
        filename: 'static/[name].[hash].css',
        chunkFilename: 'static/css/[name].[hash].css'
      })
      // TODO PWA
    ],
    resolve: {
      /**
       * @see https://webpack.js.org/configuration/resolve/
       * @example
       *  Import from .js files
       *  - import 'root/main' - get file './src/main.js'
       *  - import '@/styles/index.scss' - get file './src/template/{template}/styles/index.scss'
       *  Import from .scss files
       *  - @import "~@/styles/index"; - get file './src/template/{template}/styles/index.scss'
       *
       *  {template} - insert the path of the current template, for example - default
       */
      alias: {
        '@': path.resolve(__dirname, `./src/templates/${template}/`),
        '@root': path.resolve(__dirname, './src/')
      }
    }
  }
}
