const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    Popup: path.resolve('Extension/Views/Popup/Popup.tsx'),
    Options: path.resolve('Extension/Views/Options/Options.tsx'),
    Background: path.resolve('Extension/Mutators/Background/Background.ts'),
    Content: path.resolve("Extension/Mutators/Content/Content.tsx")
  },
  module: {
    rules: [{
      use: 'ts-loader',
      //type: 'asset/resource',
      test: /\.tsx?$/,
      exclude: /node_modules/,
    },
    {
      use: ['style-loader', 'css-loader'],
      test: /\.css$/i
    },
    {
      type: 'assets/resources',
      test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
    }]
  },
  target: 'web',  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin ({
      patterns: [
        {
          from: path.resolve("ExtensionRoot"),
          to: path.resolve("node_distribution")
        }
      ]
    }),
    ...getHtmlPlugins([
      'Popup',
      'Options'
    ]),
    //WebExtensionTarget(nodeConfig),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "http": false,
      "browser": false,
      "https": false, 
      "stream": false,
      "url": false,
      "buffer": false,
      "timers": false
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve('node_distribution')
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'Content'
      }
    }
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlPlugin({
    title: `AStartup MCC: ${chunk}`,
    filename: `${chunk}.html`,
    chunks: [chunk],
  }))
}
