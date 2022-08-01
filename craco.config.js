/* craco.config.js */
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#FF9138",
                            //menu
                            "@menu-item-color": "#7E7D88",
                            "@menu-item-active-bg": "#FFB800",
                            "@menu-item-font-size": "18px",
                            "@menu-item-height": "56px",
                            "@menu-item-boundary-margin": 0,
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};