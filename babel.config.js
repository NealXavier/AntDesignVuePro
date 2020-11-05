module.exports = {
  presets: [
    '@vue/app',
    // '@vue/cli-plugin-babel/preset',
    // "@vue/babel-preset-jsx"
  ],
  // lazy loader ant-design-vue
  // if you use import on demand ,use this code
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": true }] // `style: true` 会加载 less 文件
  ]
}
