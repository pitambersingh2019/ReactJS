const path = require('path');
const glob = require('glob');

module.exports = {
  mode: 'development',
  //entry : glob.sync("./src/**/*.*"), 
  //entry: glob.sync("./src/**/!(*.test).jsx"),
  /*entry: [ './src/Examples/ToDoList/sami.jsx', './src/Redux/store.ts' , './src/Examples/Counter/counterSlice.ts', './src/Examples/Counter/Counter.tsx','./src/utils/useCustoms.js'
            ,'./src/utils/RegisterComp.js','./src/Examples/Counter2/CounterTest.tsx','./src/Examples/Counter2/counterSlice2.ts','./src/utils/angular_redux.js','./src/sagas/index.ts',
            './src/Redux/rootReducer.ts', './src/Containers/RuleContainer/RuleContainer.tsx'],*/
  entry: [
    "./src/Redux/store.ts",
    "./src/utils/React2Ang/useCustoms.js",
    "./src/utils/React2Ang/RegisterComp.js",
    "./src/utils/React2Ang/angular_redux.js",
    "./src/sagas/index.ts",
    "./src/Redux/rootReducer.ts",
    "./src/Containers/RuleContainer/slice/index.ts",
    "./src/Containers/RuleContainer/RuleContainer.tsx",
    "./src/utils/React2Ang/designSystem/NgDropDownLanguage.jsx",
    "./src/utils/React2Ang/designSystem/ExportToNg.jsx",
  ],
  output: {
    filename: "ReactAngularJS.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/LeaderWeb/js/dist/",
  },
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ["url-loader"],
      },
    ],
  },
};