const {
    override,
    fixBabelImports,
    addBabelPlugins,
    addLessLoader
} = require("customize-cra");


module.exports = override(
    fixBabelImports("antd", {
        libraryDirectory: "es", style: true
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {"@primary-color": "#000"}
        }
    }),
    addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ]
    ),
);