module.exports ={
    outputDir:"dist",
    lintOnSave: false,
    devServer: {
        open:true,
        proxy: {
            "/api": {
                target:"http://localhost:8088",
                changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}