module.exports = {
    'presets': [
        '@babel/preset-react',
        ['@babel/preset-env', {
            // TODO dynamically set to legacy and latest to build two bundles
            'targets': 'last 2 Chrome versions',
            'useBuiltIns': 'usage',
        }],
    ],
    'plugins': [],
};
