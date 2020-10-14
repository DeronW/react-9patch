const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                        options: { presets: ["@babel/preset-react"] },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: "css-loader",
            },
        ],
    },
    devServer: {
        contentBase: "./dist",
    },
};
