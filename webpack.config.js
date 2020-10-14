const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: "css-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "index.js",
        library: "NinePatch",
        libraryTarget: "umd",
    },
    externals: ["react"],
};
