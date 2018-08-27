module.exports = {
	plugins: {
		'postcss-import': {},
		'cssnano': {
			preset: ['default', {
				discardComments: {
					removeAll: true,
				}
			}]
		},
		'postcss-cssnext': {
			browsers: ['last 2 versions', '> 3%']
		}
	}
};
