module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // Globally load my scss
                data: '@import "@/assets/scss/global/variables.scss";'
            }
        }
    }
};