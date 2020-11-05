const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const path = require("path");
const src = './src'


// const options = {
//   antDir: path.join(__dirname, './node_modules/antd-design-vue'),
//   stylesDir: path.join(__dirname, './src'),
//   varFile: path.join(__dirname, './node_modules/ant-design-vue/es/style/themes/default.less'),
//   themeVariables: ['@primary-color'],
//   // indexFileName: 'index.html',
//   generateOnce: false,
// }

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/es/style/themes/default.less"
  ),
  mainLessFile: "./src/components/Drawer/index.less",
  themeVariables: ["@primary-color"],
  indexFileName:'./public/index.html',
  generateOnce: false
};

// const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  // resolve:{
  //   alias: {
  //     vue: 'vue/dist/vue.esm.js'
  //   }
  // },
  // 开发服务器配置
  devServer: {
    // port: 8080,
    proxy: {
      '/api': {
        // 代表转发到8080端口.
        target: 'http://localhost:8080',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }else if(process.env.MOCK !== "none"){
            if(req.path !== null){
              const name = req.path
                            .split("/api/")[1]
                            .split("/")
                            .join("_");
              const mock = require(`./mock/${name}`)
              const result = mock(req.method)
              // 清空缓存
              delete require.cache[require.resolve(`./mock/${name}`)]
              return res.send(result)
            }
          }
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, src)
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins:[
      new AntDesignThemePlugin(options)
    ]
  }
}