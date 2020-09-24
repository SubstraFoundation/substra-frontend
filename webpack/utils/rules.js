export default (env) => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {loader: 'happypack/loader?id=babel'},
        ],
    },
    {
        test: /\.jpe?g$|\.gif$|\.png$/,
        use: 'url-loader?limit=10000&name=img/[hash].[ext]',
    },
    {
        test: /\.(otf|svg)(\?.+)?$/,
        use: 'url-loader?limit=8192&name=font/[name].[ext]',
    },
    {
        test: /\.eot(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject&name=font/[name].[ext]',
    },
    {
        test: /\.woff2(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff2&name=font/[name].[ext]',
    },
    {
        test: /\.woff(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff&name=font/[name].[ext]',
    },
    {
        test: /\.ttf(\?\S*)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-ttf&name=font/[name].[ext]',
    },
    {
        test: /\.html$/,
        use: 'html-loader',
    },
];
