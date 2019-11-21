module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/rng': {     
        target: 'http://codeforces.com', 
        ws: true,       
        secure: false, 
        changeOrigin: true, 
        pathRewrite: {
          '^/rng': ''
        }
      }
    }
  }
}