var path = require("path");
module.exports = {
    entry: './src/main.js',
    output: {
        path: './test',
        // path: path.resolve(__dirname, "build"),
        // publicPath: "/assets/",
        filename: 'index.js'
    },
    module: {
      loaders: [
          { test : /\.(css)$/, loader : 'style!css'},
					{ test: /(\.js|\.jsx)$/, loader: 'babel',query : {
							presets : [
								// 'stage-3',
                "react",
                "es2015",
                "stage-2"
							],
							// "plugins": ["add-module-exports","syntax-decorators"],
						}
					},

				]
     }
};
